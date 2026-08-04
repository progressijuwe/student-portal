import api from './axios';

export async function fetchStudentDashboard() {
	const { data } = await api.get('/student/dashboard');
	return data.data;
}

/**
 * The student's whole academic record in one response.
 *
 * A transcript is a single document, so it is fetched as one — assembling it
 * from a /grades call per semester would let the printed page render while
 * still half-loaded.
 */
export async function fetchTranscript() {
	const { data } = await api.get('/student/transcript');
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

/**
 * The student's registrations for a period, plus where they stand.
 *
 * `registration` is decided server-side by the same rule that blocks a second
 * submission, so the page can hide the course picker for someone who has
 * already registered instead of letting them build a basket and only then
 * telling them no.
 */
export async function fetchMyEnrollments({ sessionId, semester }) {
	const { data } = await api.get('/student/enrollments', {
		params: { session_id: sessionId, semester },
	});

	return {
		enrollments: data.data?.enrollments ?? [],
		registration: data.data?.registration ?? null,
	};
}
