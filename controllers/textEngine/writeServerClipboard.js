const spawn = require("child_process").spawn;

// process the data from pastclipboard or direct request for copying text
writeServerCp = (req, res) => {
    text = req.query.x;
    const pyProg = spawn('python', ["./python-plugins/ppr.py", text]);
    pyProg.stdout.on('data', function(data) {  
      res.write(data);
      res.end('end');
    });
    res.status(204).send();
  }

  module.exports = writeServerCp