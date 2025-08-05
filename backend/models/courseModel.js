const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  instructor: String,
  videos: [String],
  pdfs: [String],
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Course', courseSchema);
