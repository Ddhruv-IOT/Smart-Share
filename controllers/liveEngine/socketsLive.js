const {spawn} = require("child_process");

// Socket Update Enginefor Text
module.exports = (io) =>{
    io.on('connection', (socket) => {
    console.log('User connected');
    // Send updates to the client
    setInterval(() => {
      const pyProg = spawn('python',["./python-plugins/scr.py"]);
      pyProg.stdout.on('data', function(data) {  
        socket.emit('update', { message: data.toString() });
      });
    }, 1000);
  });
};