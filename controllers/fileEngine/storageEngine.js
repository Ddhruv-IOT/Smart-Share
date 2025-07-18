const multer = require("multer");
const path = require("path");
const DIRECTORY = require('dotenv').config().parsed.DIRECTORY

// Set up the storage engine
const storage = multer.diskStorage({
    destination: DIRECTORY,
    filename: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  });

module.exports = storage;