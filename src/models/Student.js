class Student {
  constructor(id, name, email, phone = '') {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.enrolledCourses = [];
    this.createdAt = new Date();
  }

  enrollInCourse(courseId) {
    if (!this.enrolledCourses.includes(courseId)) {
      this.enrolledCourses.push(courseId);
    }
  }

  unenrollFromCourse(courseId) {
    this.enrolledCourses = this.enrolledCourses.filter(id => id !== courseId);
  }
}

module.exports = Student;
