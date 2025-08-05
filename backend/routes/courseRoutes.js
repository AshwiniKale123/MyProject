const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
  createCourse,
  getCourses,
  enroll,
  getEnrolledCourses,
} = require('../controllers/courseController');

// Upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Routes
router.post('/create', upload.fields([
  { name: 'videos', maxCount: 5 },
  { name: 'pdfs', maxCount: 5 },
]), createCourse);

router.get('/', getCourses);
router.post('/enroll', enroll);
router.get('/enrolled/:studentId', getEnrolledCourses);

module.exports = router;
