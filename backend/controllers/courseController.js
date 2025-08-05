const Course = require('../models/courseModel');

exports.createCourse = async (req, res) => {
  try {
    const { title, instructor } = req.body;
    const videos = req.files['videos']?.map(file => file.filename) || [];
    const pdfs = req.files['pdfs']?.map(file => file.filename) || [];

    const course = new Course({ title, instructor, videos, pdfs });
    await course.save();
    res.status(201).json({ message: 'Course created', course });
  } catch (err) {
    res.status(500).json({ error: 'Course creation failed', details: err });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

exports.enroll = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;
    const course = await Course.findById(courseId);
    if (!course.enrolledStudents.includes(studentId)) {
      course.enrolledStudents.push(studentId);
      await course.save();
    }
    res.json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Enrollment failed' });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const { studentId } = req.params;
    const courses = await Course.find({ enrolledStudents: studentId });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch enrolled courses' });
  }
};

