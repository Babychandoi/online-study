const courses = [];
const students = [];
const enrollments = [];

let courseIdCounter = 1;
let studentIdCounter = 1;
let enrollmentIdCounter = 1;

module.exports = {
  courses,
  students,
  enrollments,
  getNextCourseId: () => courseIdCounter++,
  getNextStudentId: () => studentIdCounter++,
  getNextEnrollmentId: () => enrollmentIdCounter++
};
