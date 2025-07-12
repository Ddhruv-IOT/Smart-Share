const spawn = require("child_process").spawn;
const Clipboard_Mode = require("dotenv").config().parsed.CLIPBOARD_MODE
const { clipboardDataRef } = require("./writeServerClipboard");

var getServerCp = (req, res) => {
    if (Clipboard_Mode === "DEDICATED") {
        const data = clipboardDataRef();
        console.log(data)
        if (!data) return res.status(404).send('No clipboard data available');
        return res.status(200).send(data);
    }
    const pyProg = spawn('python',["./python-plugins/get_server_clipboard.py"]);
    pyProg.stdout.on('data', function(data) {  
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end(data.toString('utf8'));
    });
  }

  module.exports = getServerCp