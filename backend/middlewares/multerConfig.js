const multer = require('multer');
const path = require('path');

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); // Define the folder to store images
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Name files based on the timestamp
    }
});

// File validation for image uploads (optional but recommended)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG, JPG, and PNG file types are allowed!'), false);
    }
};

// Multer upload config
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Max file size: 5MB
    fileFilter: fileFilter
});

module.exports = upload;
