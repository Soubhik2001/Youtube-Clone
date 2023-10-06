const multer = require("multer");
const path = require("path");

//storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploads/videos"));
    },
    filename: function (req, file, cb) {
      const extname = path.extname(file.originalname);
      cb(null, Date.now() + extname);
    },
  });

// File filter function to accept only video files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    // Allow only files with a video/* MIME type
    cb(null, true);
  } else {
    // Reject other file types
    cb(new Error("Invalid file type. Only video files are allowed."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, //10MB
  },
});

module.exports={upload};