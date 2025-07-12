// const { text } = require("stream/consumers");

const spawn = require("child_process").spawn;
const Clipboard_Mode = require("dotenv").config().parsed.CLIPBOARD_MODE

let clipboardData = '';

// process the data from pastclipboard or direct request for copying text
writeServerCp = (req, res) => {
    text = req.query.x;

    if (Clipboard_Mode === "DEDICATED") {
          clipboardData = text;
          res.status(204)
          return res.end('end');
    }
    
    const pyProg = spawn('python', ["./python-plugins/write_server_clipboard.py", text]);
    pyProg.stdout.on('data', function(data) {  
      res.write(data);
      res.end('end');
    });
    res.status(204);
  }

  module.exports = { writeServerCp, clipboardDataRef: () => clipboardData };