const path = require('path');
const fs = require('fs');

const downloadFile = (req, res) => {
    const file = `./public/uploads/${req.params.filename}`;
    res.download(file);
}

module.exports = downloadFile;