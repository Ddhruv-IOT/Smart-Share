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

/* ------------- Text Sharing Engine ------------- */

// copy text on server device from other device
app.get("/pastclipboard", (req, res) => {
  res.sendFile('pasteClipBoard.html', {root: __dirname + "/pages/" })
});

app.get("/getClipboarddata", (req, res) => {
  res.sendFile('copyClipBoard.html', {root: __dirname + "/pages/" })
});

// see the copied text on server device
app.get('/getclipboard', getServerCp)
app.get('/copydataapi', writeServerCp)

// // route for clipboard write over post request, flutter connect side
// app.post('/', function(req, res) {
//   data = req.body
//   console.log(data)
//   res.status(201);
// });


app.post('/upload', fileUplaod) 


// Set up the file download route
app.get('/download/:filename', (req, res) => {
  const file = `./public/uploads/${req.params.filename}`;
  res.download(file);
});

// Set up a route to get the list of files
// app.get('/files', (req, res) => {
// // Use the fs module to read the contents of the folder
//   fs.readdir('./public/uploads', (err, files) => {
//     files.sort((a, b) => {
//       directoryPath = "./public/uploads"
//       const fileA = path.join(directoryPath, a);
//       const fileB = path.join(directoryPath, b);
  
//       return fs.statSync(fileB).mtime.getTime() - fs.statSync(fileA).mtime.getTime();
//     });
//     if (err) {
//       res.send(err);
//     } else {
//       // Return the array of file names to the client
//       res.send(files);
//     }
//   });
// });

app.get('/files', listFiles)
// Set up the file download route for client
app.get('/pool', function(req, res) {
    res.sendFile(path.join(__dirname, 'pages', 'download', 'download.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'upload', 'upload.html'));
});

// Stream video Str in Progress

app.get('/uploads/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = `./public/uploads/${fileName}`;
  const stat = fs.statSync(filePath);

//   res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Disposition', `inline; filename=${fileName}`);

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

// Send file for sockets page
app.get('/stream', function(req, res) {
  res.sendFile('streamFile.html', {root: __dirname + "/pages/" })
});

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
