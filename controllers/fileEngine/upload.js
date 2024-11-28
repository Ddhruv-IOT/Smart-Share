const multer = require("multer");
let storage = require("./storageEngine"); 


// Initialize the upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000000 }, // limit the file size
}).array("f", 15);

// Set up the file upload route
const fileUplaod = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send(err);
    } else {
      if (req.file === undefined) {
        res.send("Error: No File Selected!");
      } else {
        res.send("File uploaded!");
      }
    }
  });
};

module.exports = fileUplaod;
