const express = require('express');
const env = require('dotenv')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const http = require('http');
const spawn = require("child_process").spawn;
const getServerCp = require("./controllers/textEngine/getServerClipoboard")
const writeServerCp = require("./controllers/textEngine/writeServerClipboard")
const cors = require('cors');
const fileUplaod = require('./controllers/fileEngine/upload');
const listFiles = require('./controllers/fileEngine/listFiles');
const qrcode = require('qrcode-terminal');
const e = require('express');

PORT = env.config().parsed.PORT

const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public/'));
app.use(express.static(path.join(__dirname, 'pages', 'upload')));
app.use(express.static(path.join(__dirname, 'pages', 'download')));
app.use(express.static(path.join(__dirname, 'pages', 'getServerClipboard')));
app.use(express.static(path.join(__dirname, 'pages', 'pasteServerClipboard')));
app.use(cors())


// Socket Update Enginefor Text
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


app.get('/getclipboard', getServerCp)
app.get('/copydataapi', writeServerCp) // # fix naming convention

// files
app.post('/upload', fileUplaod) 
app.get('/files', listFiles)

// Set up the file download route
app.get('/download/:filename', (req, res) => {
  const file = `./public/uploads/${req.params.filename}`;
  res.download(file);
});

// !--------------- H o s t  t h e  c l i e n t  p a g e s -----------------! //

// Set up the file download route for client
app.get('/pool', function(req, res) {
    res.sendFile(path.join(__dirname, 'pages', 'download', 'download.html'));
});

// Set up the file upload route for client
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'upload', 'upload.html'));
});

// Set up the client page for text sharing
app.get("/pastclipboard", (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'pasteServerClipboard', 'pasteClipBoard.html'))
});

// Set up the client page for text sharing
app.get("/getClipboarddata", (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'getServerClipboard', 'copyClipBoard.html'))
});

// -------------------------------------------------------------------------- //

server.listen(PORT, () => {
  const getIp = spawn('python', ["./python-plugins/ip_finder.py"]);
  getIp.stdout.on('data', (ip) => {  
    console.log(ip.toString())
    console.log(`Server started on PORT ${PORT} ${ip}`);
    console.log(`Serving at: http://${ip}:${PORT}`)
    qrcode.generate(`http://${ip}:${PORT}`, { small: true }, (qrCode) => {
      console.log(qrCode);
    });
  })
});
