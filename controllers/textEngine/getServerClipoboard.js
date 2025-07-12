const spawn = require("child_process").spawn;

var getServerCp = (req, res) => {
    const pyProg = spawn('python',["./python-plugins/get_server_clipboard.py"]);
    pyProg.stdout.on('data', function(data) {  
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end(data.toString('utf8'));
    });
  }

  module.exports = getServerCp