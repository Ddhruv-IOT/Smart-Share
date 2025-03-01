const express = require('express');
const env = require('dotenv')
const path = require('path');
const http = require('http');
const spawn = require("child_process").spawn;
const cors = require('cors');
const qrcode = require('qrcode-terminal');

const getServerCp = require("./controllers/textEngine/getServerClipoboard")
const writeServerCp = require("./controllers/textEngine/writeServerClipboard")
const fileUplaod = require('./controllers/fileEngine/upload');
const listFiles = require('./controllers/fileEngine/listFiles');
const downloadFile = require('./controllers/fileEngine/downloader');
const clientRoutes = require('./routes/clientRoutes');


PORT = env.config().parsed.PORT

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
require('./controllers/liveEngine/socketsLive')(io);

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public/'));
app.use(express.static(path.join(__dirname, 'pages', 'upload')));
app.use(express.static(path.join(__dirname, 'pages', 'download')));
app.use(express.static(path.join(__dirname, 'pages', 'getServerClipboard')));
app.use(express.static(path.join(__dirname, 'pages', 'pasteServerClipboard')));
app.use(express.static(path.join(__dirname, 'pages', "gallery")));

app.use(cors())

app.get('/getclipboard', getServerCp)
app.get('/pasteData', writeServerCp) 

// files
app.post('/upload', fileUplaod) 
app.get('/files', listFiles)
app.get('/download/:filename', downloadFile); // Set up the file download route

//------------ dev features --------------

app.get('/uploads/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = `./public/uploads/${fileName}`;
  const stat = fs.statSync(filePath);

// res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Disposition', `inline; filename=${fileName}`);

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

const fs = require("fs");
// const path = require("path");

app.get("/file-metadata", (req, res) => {
    const dirPath = path.join(__dirname, "public/uploads");

    fs.readdir(dirPath, (err, files) => {
        if (err) return res.status(500).json({ error: "Failed to read directory" });

        let metadata = {};
        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            metadata[file] = fs.statSync(filePath).mtime.getTime();
        });

        res.json(metadata);
    });
});

// Send file for sockets page
app.get('/stream', function(req, res) {
  res.sendFile(path.join(__dirname, 'pages', 'gallary', 'streamFile.html'))
});


// ------------------------------------
// Servers the Frontend
app.use(clientRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.redirect('/');
});

// Start the server
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