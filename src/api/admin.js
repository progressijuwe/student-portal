import api from './axios';

export async function fetchAdminDashboard() {
	const { data } = await api.get('/admin/dashboard');
	return data.data;
}

export async function fetchAdminActivity() {
	const { data } = await api.get('/admin/activity');
	return data.data;
}

export async function createUser(formData) {
	const { data } = await api.post('/admin/users', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return data.data;
}

export async function createCourse(payload) {
	const { data } = await api.post('/admin/courses', payload);
	return data.data;
}

export async function fetchDepartments() {
	const { data } = await api.get('/options/departments');
	return data.data;
}

export async function fetchUsers(params) {
	const { data } = await api.get('/admin/users', { params });
	return data;
}

export async function fetchUserSummary(userId) {
	const { data } = await api.get(`/admin/users/${userId}/summary`);
	return data.data;
}

export async function fetchStudentGradesAdmin(userId, { sessionId, semester }) {
	const { data } = await api.get(`/admin/users/${userId}/grades`, {
		params: { session_id: sessionId, semester },
	});
	return data.data;
}

export async function fetchLecturerCoursesAdmin(userId, { sessionId }) {
	const { data } = await api.get(`/admin/users/${userId}/courses`, {
		params: { session_id: sessionId },
	});
	return data.data;
}
