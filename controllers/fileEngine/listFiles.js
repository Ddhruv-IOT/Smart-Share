const path = require('path');
const fs = require('fs');

const listFiles = (req, res) => {
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
}

module.exports = listFiles;