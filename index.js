const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const spawn = require("child_process").spawn;
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true})); 
app.use(express.static(__dirname+'/public/'));
/* ------------- Text Sharing Engine ------------- */

// see the copied text on server device
app.get('/getclipboard', (req, res) => {
  const pyProg = spawn('python',["./python-plugins/scr.py"]);
  pyProg.stdout.on('data', function(data) {  
    res.write(data);
    res.end('end');
  });
})

// copy text on server device from other device
app.get("/pastclipboard", (req, res) => {
  res.sendFile('test.html', {root: __dirname + "/pages/" })
});

// process the data from pastclipboard or direct request for copying text
app.get('/copydataapi', (req, res) => {
  text = req.query.x;
  console.log(text)
  const pyProg = spawn('python', ["./python-plugins/ppr.py", text]);
  pyProg.stdout.on('data', function(data) {  
    res.write(data);
    res.end('end');
  });
  res.status(204).send();
})

// route for clipboard write over post request, flutter connect side
app.post('/', function(req, res) {
  data = req.body
  console.log(data)
  res.status(201);
});

/* ------------- File Sharing Engine ------------- */

// Set up the storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, path.basename(file.originalname, path.extname(file.originalname)) + "-" + Date.now() + path.extname(file.originalname));
  }
});

// Initialize the upload middleware
const upload = multer({
  storage: storage,
  limits: {fileSize: 10000000000}, // limit the file size
}).single('f');

// Set up the public directory for serving uploaded files
app.use(express.static('./public'));

// Set up the file upload route
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send(err);
    } else {
      if (req.file === undefined) {
        res.send('Error: No File Selected!');
      } else {
        res.send('File uploaded!');
      }
    }
  });
});

// Set up the file download route
app.get('/download/:filename', (req, res) => {
  const file = `./public/uploads/${req.params.filename}`;
  res.download(file);
});

// Set up a route to get the list of files
app.get('/files', (req, res) => {
// Use the fs module to read the contents of the folder
  fs.readdir('./public/uploads', (err, files) => {
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

// Start the server
const port = 8000;
let ip = "o"
app.listen(port, () => {
  const getIp = spawn('python', ["./python-plugins/ip_finder.py"]);
  getIp.stdout.on('data', (ip) => {  
    console.log(ip.toString())
    console.log(`Server started on port ${port} ${ip}`);
  })
});

/*
res.redirect('/pastclipboard');
res.status(204).send();
TODO: Multiupload

  Accessble Routes
  
  Text based
  Read server clipboard:              http://192.168.1.5:8000/getclipboard
  Write to clipboard using form:      http://192.168.1.5:8000/pastclipboard
  Write to clipboard using api call:  http://192.168.1.5:8000/copydataapi?x={data}
  
  File based
  See all the uploaded files:         http://192.168.1.5:8000/pool
  Upload a file:                      http://192.168.1.5:8000/
  
*/