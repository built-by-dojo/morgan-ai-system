#!/bin/bash
# Persistence Setup — Mac
# Creates LaunchAgents for health beacon and Claude remote-control
# Run from the client's project root directory

set -e

PROJECT_DIR="$(pwd)"
LAUNCH_AGENTS_DIR="$HOME/Library/LaunchAgents"

echo "=== Persistence Setup (Mac) ==="
echo "Project: $PROJECT_DIR"
echo ""

# 1. Health Beacon LaunchAgent
BEACON_PLIST="$LAUNCH_AGENTS_DIR/com.dojo.health-beacon.plist"

cat > "$BEACON_PLIST" << PLISTEOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.dojo.health-beacon</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/node</string>
        <string>${PROJECT_DIR}/scripts/health-beacon.js</string>
    </array>
    <key>WorkingDirectory</key>
    <string>${PROJECT_DIR}</string>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>${PROJECT_DIR}/scripts/beacon-stdout.log</string>
    <key>StandardErrorPath</key>
    <string>${PROJECT_DIR}/scripts/beacon-stderr.log</string>
    <key>ThrottleInterval</key>
    <integer>30</integer>
</dict>
</plist>
PLISTEOF

echo "Created: $BEACON_PLIST"

# 2. Load the LaunchAgent
launchctl load "$BEACON_PLIST" 2>/dev/null || true
echo "Health beacon LaunchAgent loaded."

# 3. Disable sleep
echo ""
echo "Disabling sleep (requires sudo)..."
sudo pmset -a disablesleep 1 2>/dev/null || echo "Could not disable sleep (needs sudo). Run: sudo pmset -a disablesleep 1"

echo ""
echo "=== Persistence Setup Complete ==="
echo ""
echo "Health beacon: running as LaunchAgent (survives reboots)"
echo "To check: launchctl list | grep dojo"
echo "To stop:  launchctl unload $BEACON_PLIST"
echo "To start: launchctl load $BEACON_PLIST"
