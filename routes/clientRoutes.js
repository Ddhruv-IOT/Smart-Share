const express = require('express');
const path = require('path');
const router = express.Router();

// Set up the file download route for client
router.get('/pool', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'download', 'download.html'));
});

// Set up the file upload route for client
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'upload', 'upload.html'));
});

// Set up the client page for text sharing
router.get('/pastclipboard', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'pasteServerClipboard', 'pasteClipBoard.html'));
});

// Set up the client page for clipboard data retrieval
router.get('/getClipboarddata', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'getServerClipboard', 'copyClipBoard.html'));
});

module.exports = router;
