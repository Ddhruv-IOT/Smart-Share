const path = require('path');
const fs = require('fs');
const DIRECTORY = require('dotenv').config().parsed.DIRECTORY

const listFiles = (req, res) => {
    fs.readdir(DIRECTORY, (err, files) => {
        files.sort((a, b) => {
          const fileA = path.join(DIRECTORY, a);
          const fileB = path.join(DIRECTORY, b);
      
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