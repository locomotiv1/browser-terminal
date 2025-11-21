// 1. Initialize xterm.js
const term = new Terminal({
  cursorBlink: true,
  fontFamily: '"Cascadia Code", "Fira Code", monospace',
  fontSize: 14,
  theme: {
    background: "#1e1e1e",
  },
});

const fitAddon = new FitAddon.FitAddon();
term.loadAddon(fitAddon);
term.open(document.getElementById("terminal-container"));
fitAddon.fit();

// 2. Connect to the WebSocket Server
const protocol = location.protocol === "https:" ? "wss://" : "ws://";
const socket = new WebSocket(protocol + location.host);

socket.onopen = () => {
  term.write("\r\n\x1b[32mConnected to backend terminal.\x1b[0m\r\n");
};

// 3. Browser -> Server (Keystrokes)
term.onData((data) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(data);
  }
});

// 4. Server -> Browser (Shell Output)
socket.onmessage = (event) => {
  term.write(event.data);
};

socket.onclose = () => {
  term.write("\r\n\x1b[31mConnection closed.\x1b[0m\r\n");
};

window.addEventListener("resize", () => {
  fitAddon.fit();
});
