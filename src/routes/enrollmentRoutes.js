const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

router.get('/', enrollmentController.getAllEnrollments);
router.get('/:id', enrollmentController.getEnrollmentById);
router.post('/', enrollmentController.createEnrollment);
router.put('/:id/status', enrollmentController.updateEnrollmentStatus);
router.get('/student/:studentId', enrollmentController.getEnrollmentsByStudent);
router.get('/course/:courseId', enrollmentController.getEnrollmentsByCourse);

module.exports = router;
