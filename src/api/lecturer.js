import api from './axios';

export async function fetchLecturerDashboard() {
	const { data } = await api.get('/lecturer/dashboard');
	return data.data;
}

export async function fetchLecturerCourses() {
	const { data } = await api.get('/lecturer/courses');
	return data.data;
}

/**
 * The lecturer's teaching timetable, grouped by day.
 *
 * The endpoint has existed since the timetable was built but had no client —
 * lecturers had no way to see their own schedule. It backs the class-schedule
 * download on their profile.
 */
export async function fetchLecturerTimetable() {
	const { data } = await api.get('/lecturer/timetable');
	return data.data;
}

/**
 * The class list for one offering.
 *
 * `meta` is folded into the returned object rather than discarded. It was
 * dropped before, which meant the caller had no way to know the response was a
 * page: a class of forty came back as twenty with nothing to say so, the mark
 * sheet graded half of it, and the course page reported the wrong headcount.
 */
export async function fetchOfferingStudents(offeringId, { perPage } = {}) {
	const { data } = await api.get(`/lecturer/courses/${offeringId}/students`, {
		params: { per_page: perPage },
	});

	return { ...data.data, meta: data.meta };
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
