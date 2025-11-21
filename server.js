const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const pty = require("node-pty");
const os = require("os");
const path = require("path");

// 1. Setup Express to serve static files (Frontend)
const app = express();
const server = http.createServer(app);

// Serve the current directory so index.html and node_modules are accessible
app.use(express.static(__dirname));

// 2. Setup WebSocket Server for real-time data
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  // Determine shell based on OS
  const shell = os.platform() === "win32" ? "powershell.exe" : "bash";

  // Spawn the pty
  const ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env,
  });

  // PTY -> WebSocket (Output from shell)
  ptyProcess.onData((data) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  });

  // WebSocket -> PTY (Input from user)
  ws.on("message", (message) => {
    // We treat all messages as keystrokes/data
    // (In a production app, you might use JSON to handle resizing events vs data)
    ptyProcess.write(message.toString());
  });

  // Cleanup on disconnect
  ws.on("close", () => {
    console.log("Client disconnected");
    ptyProcess.kill();
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
