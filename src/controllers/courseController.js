const Course = require('../models/Course');
const db = require('../models/database');

const courseController = {
  getAllCourses: (req, res) => {
    res.json({
      success: true,
      data: db.courses
    });
  },

  getCourseById: (req, res) => {
    const course = db.courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy khóa học'
      });
    }
    res.json({
      success: true,
      data: course
    });
  },

  createCourse: (req, res) => {
    const { name, description, instructor, duration, maxStudents } = req.body;
    
    if (!name || !description || !instructor || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp đầy đủ thông tin khóa học'
      });
    }

    const course = new Course(
      db.getNextCourseId(),
      name,
      description,
      instructor,
      duration,
      maxStudents
    );

    db.courses.push(course);

    res.status(201).json({
      success: true,
      message: 'Tạo khóa học thành công',
      data: course
    });
  },

  updateCourse: (req, res) => {
    const courseId = parseInt(req.params.id);
    const courseIndex = db.courses.findIndex(c => c.id === courseId);

    if (courseIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy khóa học'
      });
    }

    const { name, description, instructor, duration, maxStudents } = req.body;
    const course = db.courses[courseIndex];

    if (name) course.name = name;
    if (description) course.description = description;
    if (instructor) course.instructor = instructor;
    if (duration) course.duration = duration;
    if (maxStudents) course.maxStudents = maxStudents;

    res.json({
      success: true,
      message: 'Cập nhật khóa học thành công',
      data: course
    });
  },

  deleteCourse: (req, res) => {
    const courseId = parseInt(req.params.id);
    const courseIndex = db.courses.findIndex(c => c.id === courseId);

    if (courseIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy khóa học'
      });
    }

    db.courses.splice(courseIndex, 1);

    res.json({
      success: true,
      message: 'Xóa khóa học thành công'
    });
  }
};

module.exports = courseController;
