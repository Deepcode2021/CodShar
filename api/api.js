const express = require('express');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Specify the directory to store uploaded files

app.use(express.json());

// Handle file upload
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const destinationPath = path.join(__dirname, 'uploads', file.originalname);
    await fs.move(file.path, destinationPath);
    res.json({ message: 'File uploaded successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error uploading file!' });
  }
});

// Handle file search and download
app.get('/download', (req, res) => {
  const fileName = req.query.filename;
  const filePath = path.join(__dirname, 'uploads', fileName);

  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ message: 'File not found!' });
  }
});

module.exports = app;
