const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const http = require('http');
const spawn = require("child_process").spawn;
const getServerCp = require("./controllers/textEngine/getServerClipoboard")
const writeServerCp = require("./controllers/textEngine/writeServerClipboard")
const cors = require('cors');
const fileUplaod = require('./controllers/fileEngine/upload');

const qrcode = require('qrcode-terminal');


const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public/'));
app.use(cors())


// Web Page to connect over Socket Engine
app.get('/sockets', (req, res) => {
  res.sendFile('socketsText.html', {root: __dirname + "/pages/" })

});

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
  res.sendFile('test.html', {root: __dirname + "/pages/" })
});

// see the copied text on server device
app.get('/getclipboard', getServerCp)
app.get('/copydataapi', writeServerCp)

// route for clipboard write over post request, flutter connect side
app.post('/', function(req, res) {
  data = req.body
  console.log(data)
  res.status(201);
});

/* ------------- File Sharing Engine ------------- */

// // Set up the storage engine
// const storage = multer.diskStorage({
//   destination: './public/uploads/',
//   filename: function(req, file, cb) {
//     cb(null, path.basename(file.originalname, path.extname(file.originalname)) + "-" + Date.now() + path.extname(file.originalname));
//   }
// });

// // Initialize the upload middleware
// const upload = multer({
//   storage: storage,
//   limits: {fileSize: 10000000000}, // limit the file size
// }).array('f', 15);

// // Set up the public directory for serving uploaded files
// app.use(express.static('./public'));

// // Set up the file upload route
// app.post('/upload', (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       res.send(err);
//     } else {
//       if (req.file === undefined) {
//         res.send('Error: No File Selected!');
//       } else {
//         res.send('File uploaded!');
//       }
//     }
//   });
// });

app.post('/upload', fileUplaod) 


// Set up the file download route
app.get('/download/:filename', (req, res) => {
  const file = `./public/uploads/${req.params.filename}`;
  res.download(file);
});

// Set up a route to get the list of files
app.get('/files', (req, res) => {
// Use the fs module to read the contents of the folder
  fs.readdir('./public/uploads', (err, files) => {
    files.sort((a, b) => {
      directoryPath = "./public/uploads"
      const fileA = path.join(directoryPath, a);
      const fileB = path.join(directoryPath, b);
  
      return fs.statSync(fileB).mtime.getTime() - fs.statSync(fileA).mtime.getTime();
    });
    if (err) {
      res.send(err);
    } else {
      // Return the array of file names to the client
      res.send(files);
    }
  });
});

// Set up the file download route for client
app.get('/pool', function(req, res) {
    res.sendFile('download.html', {root: __dirname + "/pages/" })
});

// Set up the file upload route for client
app.get('/', function(req, res) {
  res.sendFile('upload.html', {root: __dirname +"/pages/" })
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

// Start the server
const port = 80;

// Send file for sockets page
app.get('/stream', function(req, res) {
  res.sendFile('streamFile.html', {root: __dirname + "/pages/" })
});

server.listen(port, () => {
  const getIp = spawn('python', ["./python-plugins/ip_finder.py"]);
  getIp.stdout.on('data', (ip) => {  
    console.log(ip.toString())
    console.log(`Server started on port ${port} ${ip}`);
    console.log(`Serving at: http://${ip}:${port}`)
    qrcode.generate(`http://${ip}:${port}`, { small: true }, (qrCode) => {
      console.log(qrCode);
    });
  })
});

/*
res.redirect('/pastclipboard');
res.status(204).send();
TODO: 

  Accessble Routes
  
  Text based
  Read server clipboard:              http://192.168.1.5:8000/getclipboard
  Write to clipboard using form:      http://192.168.1.5:8000/pastclipboard
  Write to clipboard using api call:  http://192.168.1.5:8000/copydataapi?x={data}
  
  File based
  See all the uploaded files:         http://192.168.1.5:8000/pool
  Upload a file:                      http://192.168.1.5:8000/

  http://192.168.1.22/stream
  http://192.168.1.22/sockets
  
*/