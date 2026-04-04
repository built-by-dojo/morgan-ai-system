#!/usr/bin/env node

// Health Beacon — reports anonymised system health to Dojo monitoring
// This script sends ONLY operational metrics. NO conversation content,
// vault data, file contents, credentials, or business information.

const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

// ─── Configuration ───────────────────────────────────────────────
const CONFIG_FILE = path.join(__dirname, 'beacon-config.json');

function loadConfig() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
  } catch {
    console.error('Missing beacon-config.json — run setup first');
    process.exit(1);
  }
}

const config = loadConfig();

const BEACON_URL = config.beaconUrl;       // e.g. https://hub.dojomedia.group/api/client-beacon
const CLIENT_ID = config.clientId;         // e.g. "morgan-nelson"
const CLIENT_TOKEN = config.clientToken;   // shared secret for auth
const INTERVAL_MS = config.intervalMs || 300000; // default 5 minutes
const PROJECT_DIR = config.projectDir || path.resolve(__dirname, '..');

// ─── Data Collectors ─────────────────────────────────────────────

function getAgentStatus() {
  const agentsDir = path.join(PROJECT_DIR, 'agents');
  const agents = [];
  try {
    const dirs = fs.readdirSync(agentsDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    for (const dir of dirs) {
      const claudeMd = path.join(agentsDir, dir, 'CLAUDE.md');
      agents.push({
        name: dir,
        configured: fs.existsSync(claudeMd),
      });
    }
  } catch { /* agents dir doesn't exist yet */ }
  return agents;
}

function getVaultStats() {
  const vaultDir = path.join(PROJECT_DIR, 'knowledge', 'vault');
  try {
    if (!fs.existsSync(vaultDir)) return { exists: false, fileCount: 0 };
    let count = 0;
    function walk(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const e of entries) {
        if (e.name.startsWith('.')) continue;
        if (e.isDirectory()) walk(path.join(dir, e.name));
        else if (e.name.endsWith('.md')) count++;
      }
    }
    walk(vaultDir);
    return { exists: true, fileCount: count };
  } catch {
    return { exists: false, fileCount: 0 };
  }
}

function getLastActivity() {
  // Check git log for last commit time — no content, just timestamp
  try {
    const ts = execSync('git log -1 --format=%cI 2>/dev/null', {
      cwd: PROJECT_DIR, encoding: 'utf-8'
    }).trim();
    return ts || null;
  } catch {
    return null;
  }
}

function getSystemHealth() {
  return {
    platform: os.platform(),
    uptime: Math.floor(os.uptime()),
    nodeVersion: process.version,
    diskFree: getDiskFree(),
  };
}

function getDiskFree() {
  try {
    if (os.platform() === 'win32') {
      const out = execSync('wmic logicaldisk get freespace,size /format:csv 2>nul', { encoding: 'utf-8' });
      const lines = out.trim().split('\n').filter(l => l.includes(','));
      if (lines.length > 1) {
        const parts = lines[1].split(',');
        const free = parseInt(parts[1]);
        return free > 0 ? Math.floor(free / 1073741824) : null; // GB
      }
    } else {
      const out = execSync("df -g / 2>/dev/null | tail -1 | awk '{print $4}'", { encoding: 'utf-8' });
      return parseInt(out.trim()) || null;
    }
  } catch {}
  return null;
}

function getRemoteStatus() {
  // Check if Claude remote-control is running (process check only)
  try {
    if (os.platform() === 'win32') {
      execSync('tasklist /FI "IMAGENAME eq claude.exe" 2>nul | findstr claude', { encoding: 'utf-8' });
    } else {
      execSync('pgrep -f "claude.*remote" 2>/dev/null', { encoding: 'utf-8' });
    }
    return 'running';
  } catch {
    return 'stopped';
  }
}

function getVSCodeTunnelStatus() {
  try {
    if (os.platform() === 'win32') {
      execSync('sc query "code-tunnel" 2>nul | findstr RUNNING', { encoding: 'utf-8' });
    } else {
      execSync('pgrep -f "code.*tunnel" 2>/dev/null', { encoding: 'utf-8' });
    }
    return 'running';
  } catch {
    return 'stopped';
  }
}

// ─── Beacon Payload ──────────────────────────────────────────────

function buildPayload() {
  return {
    clientId: CLIENT_ID,
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    agents: getAgentStatus(),
    vault: getVaultStats(),
    lastActivity: getLastActivity(),
    system: getSystemHealth(),
    remote: {
      claudeRemote: getRemoteStatus(),
      vscodeTunnel: getVSCodeTunnelStatus(),
    },
  };
}

// ─── Send Beacon ─────────────────────────────────────────────────

function sendBeacon() {
  const payload = buildPayload();
  const data = JSON.stringify(payload);

  const url = new URL(BEACON_URL);
  const options = {
    hostname: url.hostname,
    port: url.port || 443,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
      'X-Client-Token': CLIENT_TOKEN,
      'X-Client-ID': CLIENT_ID,
    },
    rejectUnauthorized: true,
  };

  const req = https.request(options, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) {
        log('Beacon sent successfully');
        try {
          const response = JSON.parse(body);
          if (response.commands && response.commands.length > 0) {
            log(`Received ${response.commands.length} command(s) from Dojo`);
            for (const cmd of response.commands) {
              executeCommand(cmd);
            }
          }
        } catch { /* ignore parse errors */ }
      } else {
        log(`Beacon failed: ${res.statusCode} ${body}`);
      }
    });
  });

  req.on('error', (e) => {
    log(`Beacon error: ${e.message}`);
  });

  req.write(data);
  req.end();
}

// ─── Command Execution (safe actions only) ───────────────────────

function executeCommand(cmd) {
  log(`Executing command: ${cmd.action} (${cmd.id})`);
  let success = false;
  let message = '';

  try {
    switch (cmd.action) {
      case 'restart-beacon':
        message = 'Beacon will restart on next cycle';
        success = true;
        // Schedule restart after reporting result
        setTimeout(() => { process.exit(0); }, 5000);
        break;

      case 'restart-remote':
        if (os.platform() === 'win32') {
          execSync('powershell -Command "Stop-Process -Name claude -ErrorAction SilentlyContinue; Start-Sleep -Seconds 2; Start-Process claude -ArgumentList \'remote-control\',\'--spawn=same-dir\' -WindowStyle Hidden"', { timeout: 15000 });
        } else {
          execSync('pkill -f "claude.*remote" 2>/dev/null; sleep 2; nohup claude remote-control --spawn=same-dir > /dev/null 2>&1 &', { timeout: 15000 });
        }
        message = 'Remote control restarted';
        success = true;
        break;

      case 'restart-tunnel':
        if (os.platform() === 'win32') {
          execSync('net stop "code-tunnel" & net start "code-tunnel"', { timeout: 30000 });
        } else {
          execSync('pkill -f "code.*tunnel" 2>/dev/null; sleep 2; code tunnel --accept-server-license-terms &', { timeout: 15000 });
        }
        message = 'VS Code tunnel restarted';
        success = true;
        break;

      case 'clear-cache':
        const claudeDir = path.join(os.homedir(), '.claude');
        try {
          const files = fs.readdirSync(claudeDir).filter(f => f.startsWith('statsig'));
          files.forEach(f => fs.unlinkSync(path.join(claudeDir, f)));
          message = `Cleared ${files.length} statsig cache file(s)`;
          success = true;
        } catch (e) {
          message = `Cache clear failed: ${e.message}`;
        }
        break;

      case 'git-pull':
        const output = execSync('git pull --ff-only 2>&1', {
          cwd: PROJECT_DIR, encoding: 'utf-8', timeout: 30000
        });
        message = output.trim().substring(0, 200);
        success = true;
        break;

      case 'run-health-check':
        // Trigger immediate beacon send
        setTimeout(() => sendBeacon(), 1000);
        message = 'Health check triggered';
        success = true;
        break;

      case 'vault-backup':
        const vaultDir = path.join(PROJECT_DIR, 'knowledge', 'vault');
        if (fs.existsSync(vaultDir)) {
          execSync('git add knowledge/vault/ && git commit -m "vault: automated backup" 2>&1 || true', {
            cwd: PROJECT_DIR, encoding: 'utf-8', timeout: 30000
          });
          message = 'Vault backed up to git';
          success = true;
        } else {
          message = 'Vault directory not found';
        }
        break;

      case 'log-rotate':
        const logFile = path.join(__dirname, 'beacon.log');
        if (fs.existsSync(logFile)) {
          const lines = fs.readFileSync(logFile, 'utf-8').split('\n');
          if (lines.length > 200) {
            fs.writeFileSync(logFile, lines.slice(-100).join('\n') + '\n');
            message = `Rotated log from ${lines.length} to 100 lines`;
          } else {
            message = `Log is ${lines.length} lines, no rotation needed`;
          }
          success = true;
        }
        break;

      case 'update-beacon':
        const pullOut = execSync('git pull --ff-only 2>&1', {
          cwd: __dirname, encoding: 'utf-8', timeout: 30000
        });
        message = `Beacon updated: ${pullOut.trim().substring(0, 200)}`;
        success = true;
        // Restart after updating
        setTimeout(() => { process.exit(0); }, 5000);
        break;

      case 'send-notification':
        log(`NOTIFICATION FROM DOJO: ${cmd.params?.message || 'No message'}`);
        message = 'Notification logged';
        success = true;
        break;

      default:
        message = `Unknown command: ${cmd.action}`;
        break;
    }
  } catch (e) {
    message = `Command failed: ${e.message}`;
  }

  // Report result back
  reportCommandResult(cmd.id, success, message);
}

function reportCommandResult(commandId, success, message) {
  const data = JSON.stringify({ commandId, success, message });
  const url = new URL(BEACON_URL.replace('/client-beacon', '/client-command-result'));

  const options = {
    hostname: url.hostname,
    port: url.port || 443,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
      'X-Client-Token': CLIENT_TOKEN,
      'X-Client-ID': CLIENT_ID,
    },
    rejectUnauthorized: true,
  };

  const req = https.request(options, () => {});
  req.on('error', (e) => log(`Command result report failed: ${e.message}`));
  req.write(data);
  req.end();
  log(`Command ${commandId}: ${success ? 'SUCCESS' : 'FAILED'} — ${message}`);
}

function log(msg) {
  const line = `[${new Date().toISOString()}] [beacon] ${msg}`;
  console.log(line);
  // Append to local log (max 1000 lines)
  const logFile = path.join(__dirname, 'beacon.log');
  try {
    let lines = [];
    if (fs.existsSync(logFile)) {
      lines = fs.readFileSync(logFile, 'utf-8').split('\n').filter(Boolean);
    }
    lines.push(line);
    if (lines.length > 1000) lines = lines.slice(-500);
    fs.writeFileSync(logFile, lines.join('\n') + '\n');
  } catch { /* ignore log failures */ }
}

// ─── Start ───────────────────────────────────────────────────────

log(`Health beacon starting — client: ${CLIENT_ID}, interval: ${INTERVAL_MS / 1000}s`);
log(`Reporting to: ${BEACON_URL}`);
log(`Monitoring: ${PROJECT_DIR}`);

// Send immediately, then on interval
sendBeacon();
setInterval(sendBeacon, INTERVAL_MS);

// Graceful shutdown
process.on('SIGTERM', () => { log('Beacon shutting down'); process.exit(0); });
process.on('SIGINT', () => { log('Beacon shutting down'); process.exit(0); });
