const Student = require('../models/Student');
const db = require('../models/database');

const studentController = {
  getAllStudents: (req, res) => {
    res.json({
      success: true,
      data: db.students
    });
  },

  getStudentById: (req, res) => {
    const student = db.students.find(s => s.id === parseInt(req.params.id));
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sinh viên'
      });
    }
    res.json({
      success: true,
      data: student
    });
  },

  createStudent: (req, res) => {
    const { name, email, phone } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp tên và email'
      });
    }

    const existingStudent = db.students.find(s => s.email === email);
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Email đã tồn tại'
      });
    }

    const student = new Student(
      db.getNextStudentId(),
      name,
      email,
      phone
    );

    db.students.push(student);

    res.status(201).json({
      success: true,
      message: 'Tạo sinh viên thành công',
      data: student
    });
  },

  updateStudent: (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = db.students.findIndex(s => s.id === studentId);

    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sinh viên'
      });
    }

    const { name, email, phone } = req.body;
    const student = db.students[studentIndex];

    if (name) student.name = name;
    if (email) {
      const existingStudent = db.students.find(s => s.email === email && s.id !== studentId);
      if (existingStudent) {
        return res.status(400).json({
          success: false,
          message: 'Email đã tồn tại'
        });
      }
      student.email = email;
    }
    if (phone !== undefined) student.phone = phone;

    res.json({
      success: true,
      message: 'Cập nhật sinh viên thành công',
      data: student
    });
  },

  deleteStudent: (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = db.students.findIndex(s => s.id === studentId);

    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sinh viên'
      });
    }

    db.students.splice(studentIndex, 1);

    res.json({
      success: true,
      message: 'Xóa sinh viên thành công'
    });
  }
};

module.exports = studentController;
