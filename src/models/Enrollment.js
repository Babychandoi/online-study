class Enrollment {
  constructor(id, studentId, courseId) {
    this.id = id;
    this.studentId = studentId;
    this.courseId = courseId;
    this.enrollmentDate = new Date();
    this.status = 'active'; // active, completed, dropped
  }

  complete() {
    this.status = 'completed';
  }

  drop() {
    this.status = 'dropped';
  }
}

module.exports = Enrollment;
