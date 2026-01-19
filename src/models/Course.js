class Course {
  constructor(id, name, description, instructor, duration, maxStudents = 30) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.instructor = instructor;
    this.duration = duration;
    this.maxStudents = maxStudents;
    this.createdAt = new Date();
  }
}

module.exports = Course;
