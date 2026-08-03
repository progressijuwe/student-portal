import api from './axios';

/* -------------------------------------------------------------------------- */
/* Dashboard                                                                   */
/* -------------------------------------------------------------------------- */

export async function fetchAdminDashboard() {
	const { data } = await api.get('/admin/dashboard');
	return data.data;
}

export async function fetchAdminActivity() {
	const { data } = await api.get('/admin/activity');
	return data.data;
}

/* -------------------------------------------------------------------------- */
/* Users                                                                       */
/* -------------------------------------------------------------------------- */

export async function createUser(formData) {
	const { data } = await api.post('/admin/users', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
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

/* -------------------------------------------------------------------------- */
/* Courses                                                                     */
/* -------------------------------------------------------------------------- */

export async function fetchDepartments() {
	const { data } = await api.get('/options/departments');
	return data.data;
}

export async function fetchCourses(params) {
	const { data } = await api.get('/admin/courses', { params });
	return data;
}

export async function createCourse(payload) {
	const { data } = await api.post('/admin/courses', payload);
	return data.data;
}

export async function updateCourse(courseId, payload) {
	const { data } = await api.patch(`/admin/courses/${courseId}`, payload);
	return data.data;
}

export async function setCourseActive(courseId, isActive) {
	const action = isActive ? 'activate' : 'deactivate';
	const { data } = await api.patch(`/admin/courses/${courseId}/${action}`);
	return data.data;
}

/* -------------------------------------------------------------------------- */
/* Course offerings                                                            */
/*                                                                             */
/* A course is a catalogue entry; an offering is that course actually being run */
/* in a given session and semester, with a lecturer attached. Registration,     */
/* grading and the timetable all hang off the offering, so nothing downstream   */
/* can start until one exists.                                                  */
/* -------------------------------------------------------------------------- */

export async function fetchOfferings(params) {
	const { data } = await api.get('/admin/offerings', { params });
	return data;
}

export async function createOffering(payload) {
	const { data } = await api.post('/admin/offerings', payload);
	return data.data;
}

/**
 * Only the lecturer and the active flag are editable — the course, session and
 * semester are the offering's identity and the API rejects changes to them.
 */
export async function updateOffering(offeringId, payload) {
	const { data } = await api.patch(`/admin/offerings/${offeringId}`, payload);
	return data.data;
}

/* -------------------------------------------------------------------------- */
/* Course registration review                                                  */
/*                                                                             */
/* Grouped by student server-side: one row per student with all their courses,  */
/* which is how the review table renders. Approving sends the whole set of      */
/* enrollment ids so the submission is committed atomically.                    */
/* -------------------------------------------------------------------------- */

export async function fetchRegistrations(params) {
	const { data } = await api.get('/admin/registrations', { params });
	return data;
}

export async function reviewRegistrations({ enrollmentIds, action }) {
	const { data } = await api.patch('/admin/registrations/bulk-review', {
		enrollment_ids: enrollmentIds,
		action,
	});
	return data;
}

/* -------------------------------------------------------------------------- */
/* Results review                                                              */
/*                                                                             */
/* Grouped by course offering — a lecturer submits a whole mark sheet and the   */
/* admin approves or rejects it as a unit.                                     */
/* -------------------------------------------------------------------------- */

export async function fetchResults(params) {
	const { data } = await api.get('/admin/results', { params });
	return data;
}

export async function fetchResultDetail(offeringId, params) {
	const { data } = await api.get(`/admin/results/${offeringId}`, { params });
	return data.data;
}

export async function reviewResults({ gradeIds, action, rejectionReason }) {
	const { data } = await api.patch('/admin/results/bulk-review', {
		grade_ids: gradeIds,
		action,
		rejection_reason: rejectionReason,
	});
	return data;
}
