const API_URL = '/api';

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
        
        if (tabName === 'courses') {
            loadCourses();
        } else if (tabName === 'students') {
            loadStudents();
        } else if (tabName === 'enrollments') {
            loadEnrollments();
        }
    });
});

// Notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Course Functions
function showCourseForm() {
    document.getElementById('course-form').style.display = 'block';
}

function hideCourseForm() {
    document.getElementById('course-form').style.display = 'none';
    document.getElementById('add-course-form').reset();
}

document.getElementById('add-course-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const courseData = {
        name: document.getElementById('course-name').value,
        description: document.getElementById('course-description').value,
        instructor: document.getElementById('course-instructor').value,
        duration: parseInt(document.getElementById('course-duration').value),
        maxStudents: parseInt(document.getElementById('course-max-students').value)
    };
    
    try {
        const response = await fetch(`${API_URL}/courses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(courseData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification(result.message);
            hideCourseForm();
            loadCourses();
        } else {
            showNotification(result.message, 'error');
        }
    } catch (error) {
        showNotification('Lỗi khi thêm khóa học', 'error');
    }
});

async function loadCourses() {
    try {
        const response = await fetch(`${API_URL}/courses`);
        const result = await response.json();
        
        if (result.success) {
            displayCourses(result.data);
        }
    } catch (error) {
        showNotification('Lỗi khi tải danh sách khóa học', 'error');
    }
}

function displayCourses(courses) {
    const container = document.getElementById('courses-list');
    
    if (courses.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">Chưa có khóa học nào.</p>';
        return;
    }
    
    container.innerHTML = courses.map(course => `
        <div class="item-card">
            <h3>${course.name}</h3>
            <div class="item-info">
                <p><strong>Mô tả:</strong> ${course.description}</p>
                <p><strong>Giảng viên:</strong> ${course.instructor}</p>
                <p><strong>Thời lượng:</strong> ${course.duration} giờ</p>
                <p><strong>Số SV tối đa:</strong> ${course.maxStudents}</p>
            </div>
            <div class="item-actions">
                <button class="btn btn-danger" onclick="deleteCourse(${course.id})">Xóa</button>
            </div>
        </div>
    `).join('');
}

async function deleteCourse(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/courses/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification(result.message);
            loadCourses();
        } else {
            showNotification(result.message, 'error');
        }
    } catch (error) {
        showNotification('Lỗi khi xóa khóa học', 'error');
    }
}

// Student Functions
function showStudentForm() {
    document.getElementById('student-form').style.display = 'block';
}

function hideStudentForm() {
    document.getElementById('student-form').style.display = 'none';
    document.getElementById('add-student-form').reset();
}

document.getElementById('add-student-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const studentData = {
        name: document.getElementById('student-name').value,
        email: document.getElementById('student-email').value,
        phone: document.getElementById('student-phone').value
    };
    
    try {
        const response = await fetch(`${API_URL}/students`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification(result.message);
            hideStudentForm();
            loadStudents();
        } else {
            showNotification(result.message, 'error');
        }
    } catch (error) {
        showNotification('Lỗi khi thêm sinh viên', 'error');
    }
});

async function loadStudents() {
    try {
        const response = await fetch(`${API_URL}/students`);
        const result = await response.json();
        
        if (result.success) {
            displayStudents(result.data);
        }
    } catch (error) {
        showNotification('Lỗi khi tải danh sách sinh viên', 'error');
    }
}

function displayStudents(students) {
    const container = document.getElementById('students-list');
    
    if (students.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">Chưa có sinh viên nào.</p>';
        return;
    }
    
    container.innerHTML = students.map(student => `
        <div class="item-card">
            <h3>${student.name}</h3>
            <div class="item-info">
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Số điện thoại:</strong> ${student.phone || 'Chưa có'}</p>
                <p><strong>Số khóa học:</strong> ${student.enrolledCourses.length}</p>
            </div>
            <div class="item-actions">
                <button class="btn btn-danger" onclick="deleteStudent(${student.id})">Xóa</button>
            </div>
        </div>
    `).join('');
}

async function deleteStudent(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/students/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification(result.message);
            loadStudents();
        } else {
            showNotification(result.message, 'error');
        }
    } catch (error) {
        showNotification('Lỗi khi xóa sinh viên', 'error');
    }
}

// Enrollment Functions
async function showEnrollmentForm() {
    document.getElementById('enrollment-form').style.display = 'block';
    await loadStudentOptions();
    await loadCourseOptions();
}

function hideEnrollmentForm() {
    document.getElementById('enrollment-form').style.display = 'none';
    document.getElementById('add-enrollment-form').reset();
}

async function loadStudentOptions() {
    try {
        const response = await fetch(`${API_URL}/students`);
        const result = await response.json();
        
        if (result.success) {
            const select = document.getElementById('enrollment-student');
            select.innerHTML = '<option value="">-- Chọn sinh viên --</option>' +
                result.data.map(student => 
                    `<option value="${student.id}">${student.name} (${student.email})</option>`
                ).join('');
        }
    } catch (error) {
        showNotification('Lỗi khi tải danh sách sinh viên', 'error');
    }
}

async function loadCourseOptions() {
    try {
        const response = await fetch(`${API_URL}/courses`);
        const result = await response.json();
        
        if (result.success) {
            const select = document.getElementById('enrollment-course');
            select.innerHTML = '<option value="">-- Chọn khóa học --</option>' +
                result.data.map(course => 
                    `<option value="${course.id}">${course.name} - ${course.instructor}</option>`
                ).join('');
        }
    } catch (error) {
        showNotification('Lỗi khi tải danh sách khóa học', 'error');
    }
}

document.getElementById('add-enrollment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const enrollmentData = {
        studentId: document.getElementById('enrollment-student').value,
        courseId: document.getElementById('enrollment-course').value
    };
    
    try {
        const response = await fetch(`${API_URL}/enrollments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(enrollmentData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification(result.message);
            hideEnrollmentForm();
            loadEnrollments();
        } else {
            showNotification(result.message, 'error');
        }
    } catch (error) {
        showNotification('Lỗi khi đăng ký khóa học', 'error');
    }
});

async function loadEnrollments() {
    try {
        const [enrollmentsRes, studentsRes, coursesRes] = await Promise.all([
            fetch(`${API_URL}/enrollments`),
            fetch(`${API_URL}/students`),
            fetch(`${API_URL}/courses`)
        ]);
        
        const enrollments = await enrollmentsRes.json();
        const students = await studentsRes.json();
        const courses = await coursesRes.json();
        
        if (enrollments.success && students.success && courses.success) {
            displayEnrollments(enrollments.data, students.data, courses.data);
        }
    } catch (error) {
        showNotification('Lỗi khi tải danh sách đăng ký', 'error');
    }
}

function displayEnrollments(enrollments, students, courses) {
    const container = document.getElementById('enrollments-list');
    
    if (enrollments.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">Chưa có đăng ký nào.</p>';
        return;
    }
    
    container.innerHTML = enrollments.map(enrollment => {
        const student = students.find(s => s.id === enrollment.studentId);
        const course = courses.find(c => c.id === enrollment.courseId);
        
        return `
            <div class="enrollment-card">
                <h3>Đăng Ký #${enrollment.id}</h3>
                <div class="item-info">
                    <p><strong>Sinh viên:</strong> ${student ? student.name : 'N/A'}</p>
                    <p><strong>Khóa học:</strong> ${course ? course.name : 'N/A'}</p>
                    <p><strong>Ngày đăng ký:</strong> ${new Date(enrollment.enrollmentDate).toLocaleDateString('vi-VN')}</p>
                    <span class="status ${enrollment.status}">${getStatusText(enrollment.status)}</span>
                </div>
            </div>
        `;
    }).join('');
}

function getStatusText(status) {
    const statusMap = {
        'active': 'Đang học',
        'completed': 'Hoàn thành',
        'dropped': 'Đã bỏ học'
    };
    return statusMap[status] || status;
}

// Initialize
loadCourses();
