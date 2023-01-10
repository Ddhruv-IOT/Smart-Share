const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const spawn = require("child_process").spawn;

const app = express();



app.get('/cp', (req, res) => {

  // const { spawn } = require('child_process');
  // const pyProg = spawn('python', ['./../pypy.py']);
  const pyProg = spawn('python',["C:/Users/ACER/Desktop/scr.py"]);

  pyProg.stdout.on('data', function(data) {

      console.log(data.toString());
      res.write(data);
      res.end('end');
  });
})



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
  limits: {fileSize: 10000000000}, // limit the file size to 1 MB
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
    res.sendFile('/download.html', {root: __dirname })
});

// Set up the file upload route for client
app.get('/', function(req, res) {
  res.sendFile('/upload.html', {root: __dirname })
});

// Start the server
const port = 3000;
app.listen(port, () => {

  console.log(`Server started on port ${port}`);
});



// TODO: Multiupload