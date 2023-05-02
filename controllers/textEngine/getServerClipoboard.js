const spawn = require("child_process").spawn;

var getServerCp = (req, res) => {
    const pyProg = spawn('python',["./python-plugins/scr.py"]);
    pyProg.stdout.on('data', function(data) {  
      res.write(data);
      res.end();
    });
  }

  module.exports = getServerCp