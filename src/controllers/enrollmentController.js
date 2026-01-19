const Enrollment = require('../models/Enrollment');
const db = require('../models/database');

const enrollmentController = {
  getAllEnrollments: (req, res) => {
    res.json({
      success: true,
      data: db.enrollments
    });
  },

  getEnrollmentById: (req, res) => {
    const enrollment = db.enrollments.find(e => e.id === parseInt(req.params.id));
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đăng ký'
      });
    }
    res.json({
      success: true,
      data: enrollment
    });
  },

  createEnrollment: (req, res) => {
    const { studentId, courseId } = req.body;
    
    if (!studentId || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp ID sinh viên và ID khóa học'
      });
    }

    const student = db.students.find(s => s.id === parseInt(studentId));
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sinh viên'
      });
    }

    const course = db.courses.find(c => c.id === parseInt(courseId));
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy khóa học'
      });
    }

    const existingEnrollment = db.enrollments.find(
      e => e.studentId === parseInt(studentId) && 
           e.courseId === parseInt(courseId) && 
           e.status === 'active'
    );

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Sinh viên đã đăng ký khóa học này'
      });
    }

    const courseEnrollments = db.enrollments.filter(
      e => e.courseId === parseInt(courseId) && e.status === 'active'
    );

    if (courseEnrollments.length >= course.maxStudents) {
      return res.status(400).json({
        success: false,
        message: 'Khóa học đã đầy'
      });
    }

    const enrollment = new Enrollment(
      db.getNextEnrollmentId(),
      parseInt(studentId),
      parseInt(courseId)
    );

    db.enrollments.push(enrollment);
    student.enrollInCourse(parseInt(courseId));

    res.status(201).json({
      success: true,
      message: 'Đăng ký khóa học thành công',
      data: enrollment
    });
  },

  updateEnrollmentStatus: (req, res) => {
    const enrollmentId = parseInt(req.params.id);
    const enrollment = db.enrollments.find(e => e.id === enrollmentId);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đăng ký'
      });
    }

    const { status } = req.body;

    if (!status || !['active', 'completed', 'dropped'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Trạng thái không hợp lệ'
      });
    }

    enrollment.status = status;

    if (status === 'completed') {
      enrollment.complete();
    } else if (status === 'dropped') {
      enrollment.drop();
      const student = db.students.find(s => s.id === enrollment.studentId);
      if (student) {
        student.unenrollFromCourse(enrollment.courseId);
      }
    }

    res.json({
      success: true,
      message: 'Cập nhật trạng thái đăng ký thành công',
      data: enrollment
    });
  },

  getEnrollmentsByStudent: (req, res) => {
    const studentId = parseInt(req.params.studentId);
    const enrollments = db.enrollments.filter(e => e.studentId === studentId);
    
    res.json({
      success: true,
      data: enrollments
    });
  },

  getEnrollmentsByCourse: (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const enrollments = db.enrollments.filter(e => e.courseId === courseId);
    
    res.json({
      success: true,
      data: enrollments
    });
  }
};

module.exports = enrollmentController;
