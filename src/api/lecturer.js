import api from './axios';

export async function fetchLecturerDashboard() {
	const { data } = await api.get('/lecturer/dashboard');
	return data.data;
}

export async function fetchLecturerCourses() {
	const { data } = await api.get('/lecturer/courses');
	return data.data;
}

export async function fetchOfferingStudents(offeringId) {
	const { data } = await api.get(`/lecturer/courses/${offeringId}/students`);
	return data.data;
}

export async function submitGrade({ enrollmentId, score }) {
	const { data } = await api.post('/lecturer/grades', {
		enrollment_id: enrollmentId,
		score,
	});
	return data.data;
}

export async function saveDraftGrades(grades) {
	const { data } = await api.post('/lecturer/grades/draft', { grades });
	return data.data;
}

export async function batchSubmitGrades(grades) {
	const { data } = await api.post('/lecturer/grades/batch', { grades });
	return data.data;
}
