# Web Terminal Emulator

A lightweight, browser-based terminal emulator that provides real time access to your system's shell. Built with Node.js, WebSockets, and xterm.js.

https://github.com/user-attachments/assets/0d6999ec-bebf-4ecd-a686-ca611397007a

## Features

- Cross-Platform Support: Automatically detects the operating system to launch the appropriate shell
- Real-time Emulation: Uses xterm.js to render a fully functional terminal in the browser.

## ⚠️ Security Warning

- Do not host this on a public server or port-forward it to the internet without adding authentication and HTTPS.
- Anyone with access to the URL has full control over the host user's shell.
- This is intended for local development or educational purposes only.

## Installation

1.Clone this repository or download the source code

```
git clone https://github.com/locomotiv1/browser-terminal.git
cd browser-terminal
```

2.Install the required dependencies:

```
npm install express ws node-pty xterm xterm-addon-fit
```

## Usage

1.Run the server script using Node.js:

```
node server.js
```

2.Open your web browser and navigate to `http://localhost:3000`

You should see a terminal interface. You can type commands just like you would in a standard terminal window (e.g `ls`, `mkdir`, `touch`)

## License

[MIT](https://choosealicense.com/licenses/mit/)
