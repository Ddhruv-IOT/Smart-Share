const DIRECTORY = require('dotenv').config().parsed.DIRECTORY


const downloadFile = (req, res) => {
    const file = `${DIRECTORY}/${req.params.filename}`;
    res.download(file);
}

module.exports = downloadFile;