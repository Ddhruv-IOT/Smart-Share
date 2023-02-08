const express = require('express');
const app = express();
const fs = require('fs');

app.get('/uploads/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = `./public/uploads/${fileName}`;
  const stat = fs.statSync(filePath);

//   res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Disposition', `inline; filename=${fileName}`);

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
