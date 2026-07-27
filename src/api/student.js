import api from './axios';

export async function fetchStudentDashboard() {
	const { data } = await api.get('/student/dashboard');
	return data.data;
}

export async function fetchGpaRecords() {
	const { data } = await api.get('/student/gpa');
	return data.data;
}

export async function fetchStudentTimetable() {
	const { data } = await api.get('/student/timetable');
	return data.data;
}

export async function fetchStudentCourses() {
	const { data } = await api.get('/student/courses');
	return data.data;
}

export async function fetchStudentGrades({ sessionId, semester }) {
	const params = {};
	if (sessionId) params.session_id = sessionId;
	if (semester) params.semester = semester;

	const { data } = await api.get('/student/grades', { params });
	return data.data;
}

export async function fetchAvailableOfferings({ semester }) {
	const { data } = await api.get('/student/available-offerings', {
		params: { semester },
	});
	return data.data;
}

export async function submitRegistration(courseOfferingIds) {
	const { data } = await api.post('/student/enrollments', {
		course_offering_ids: courseOfferingIds,
	});
	return data.data;
}

export async function fetchMyEnrollments({ sessionId, semester }) {
	const { data } = await api.get('/student/enrollments', {
		params: { session_id: sessionId, semester },
	});
	return data.data;
}
