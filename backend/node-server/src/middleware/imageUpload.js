const { mkdir } = require('node:fs/promises');
const { join, extname } = require('node:path');
const { stat } = require('node:fs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Function to create directory if it doesn't exist
async function makeDirectoryIfNotExist(directory) {
  try {
    await mkdir(directory, { recursive: true });
  } catch (error) {
    console.error('Failed to create directory:', error);
  }
}

// Function to configure multer storage
function configureStorage(directory) {
  const projectFolder = join('media', directory);

  // Ensure the directory exists
  stat(projectFolder, async (err, stats) => {
    if (err || !stats.isDirectory()) {
      await makeDirectoryIfNotExist(projectFolder);
    }
  });

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, projectFolder);
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + extname(file.originalname));
    },
  });
}

// Function to create multer upload middleware
function uploadFile(directory, nameAttribute) {
  const storage = configureStorage(directory);

  return multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/webp',
      ];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(
          new Error('Only images of type .jpeg, .png, .jpg, and .webp are allowed!')
        );
      }
    },
  }).single(nameAttribute);
}

module.exports = uploadFile;
