require('dotenv').config();
const express = require('express');
const path = require('path');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');

const router = express.Router();

// Cấu hình Multer để lưu trữ ảnh trong bộ nhớ tạm
const storageMemory = multer.memoryStorage();
const uploadMemory = multer({ storage: storageMemory });

// Cấu hình Multer để lưu trữ ảnh trong thư mục 'images'
const storageDisk = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../images'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploadDisk = multer({ storage: storageDisk });

router.get('/upload', (req, res) => {
  console.log('come');
  res.send('Upload endpoint is working');
});

/**
 * @route POST /upload
 * @desc Thêm ảnh mới và lưu vào thư mục 'images'
 * @access Public
 */
router.post('/upload', uploadDisk.single('myImage'), (req, res) => {
  try {
    console.log('File uploaded successfully:', req.file);
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Error uploading file', error });
  }
});

/**
 * @route POST /uploadBasicBlob
 * @desc Thêm ảnh mới và lưu vào Azure Blob Storage
 * @access Public
 */
router.post('/uploadBasicBlob', uploadMemory.single('myImage'), async (req, res) => {
    console.log('comee');
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME);
  
    try {
      // Tạo tên blob hợp lệ bằng cách thay thế các ký tự không hợp lệ
      const blobName = `${Date.now()}-${req.file.originalname}`
        .replace(/[\/\+\=\:\*\?\"\<\>\|]/g, '-'); // Thay thế các ký tự không hợp lệ bằng dấu gạch ngang
  
        console.log(blobName)
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  
      // Upload buffer to Azure Blob Storage
      const uploadBlobResponse = await blockBlobClient.uploadData(req.file.buffer);
      console.log('Blob đã được tải lên thành công. requestId: ', uploadBlobResponse.requestId);
  
      res.status(200).json({ message: 'File uploaded successfully', file: blobName });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'Error uploading file', error });
    }
  
});

module.exports = router;
    