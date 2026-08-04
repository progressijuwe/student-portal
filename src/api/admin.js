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

/**
 * Creates many accounts from a CSV.
 *
 * The response separates rows that were created from rows that were rejected,
 * so a file with three bad lines still imports the rest — and each created user
 * carries the temporary password, which is the only copy that exists.
 */
export async function bulkImportUsers({ file, role }) {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('role', role);

	const { data } = await api.post('/admin/users/bulk-import', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return data.data;
}

/**
 * Exports the list the admin is currently looking at.
 *
 * The same filter parameters the table was fetched with are forwarded, and the
 * API streams every matching row rather than the page on screen — an export
 * that stopped at twenty would look complete and not be.
 */
export async function exportUsers(params) {
	const { data } = await api.get('/admin/users/export', {
		params,
		responseType: 'blob',
	});
	return data;
}

export async function exportCourses(params) {
	const { data } = await api.get('/admin/courses/export', {
		params,
		responseType: 'blob',
	});
	return data;
}

/**
 * Fetched rather than linked: the route sits behind auth:sanctum, so an anchor
 * href would arrive without the bearer token and be rejected.
 */
export async function fetchCsvTemplate(role) {
	const { data } = await api.get(`/admin/users/csv-template/${role}`, {
		responseType: 'blob',
	});
	return data;
}

/**
 * Issues a new temporary password and returns it in the response.
 *
 * The plain password is the deliverable: with no mail service the admin has to
 * read it out to the user, so it is shown once in the UI and never stored.
 */
export async function resetUserPassword(userId) {
	const { data } = await api.post(`/admin/users/${userId}/reset-password`);
	return data.data;
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
/* Academic sessions                                                           */
/*                                                                             */
/* Sessions are never deleted — offerings and GPA records reference them with  */
/* restrictOnDelete, and an academic record is meant to accumulate.            */
/* -------------------------------------------------------------------------- */

export async function fetchAdminSessions(params) {
	const { data } = await api.get('/admin/sessions', { params });
	return data;
}

export async function createAcademicSession(payload) {
	const { data } = await api.post('/admin/sessions', payload);
	return data.data;
}

export async function updateAcademicSession(sessionId, payload) {
	const { data } = await api.patch(`/admin/sessions/${sessionId}`, payload);
	return data.data;
}

/**
 * Rolls the whole portal over to a different session.
 *
 * Its own endpoint rather than a field on update, because it rewrites every
 * other session's flag and changes what every role sees as "now".
 */
export async function setCurrentAcademicSession(sessionId) {
	const { data } = await api.patch(
		`/admin/sessions/${sessionId}/set-current`,
	);
	return data.data;
}

/* -------------------------------------------------------------------------- */
/* Venues                                                                      */
/*                                                                             */
/* Rooms are never deleted — timetable slots reference them with               */
/* restrictOnDelete, so taking one out of use means clearing is_active.        */
/* -------------------------------------------------------------------------- */

export async function fetchVenues(params) {
	const { data } = await api.get('/admin/venues', { params });
	return data;
}

export async function createVenue(payload) {
	const { data } = await api.post('/admin/venues', payload);
	return data.data;
}

export async function updateVenue(venueId, payload) {
	const { data } = await api.patch(`/admin/venues/${venueId}`, payload);
	return data.data;
}

/* -------------------------------------------------------------------------- */
/* Timetable                                                                   */
/*                                                                             */
/* The API rejects a slot that double-books the venue, the lecturer, or the     */
/* cohort's own level, reporting each clash under a `conflict` key.            */
/* -------------------------------------------------------------------------- */

export async function fetchTimetableSlots(params) {
	const { data } = await api.get('/admin/timetable', { params });
	return data;
}

export async function createTimetableSlot(payload) {
	const { data } = await api.post('/admin/timetable', payload);
	return data.data;
}

export async function updateTimetableSlot(slotId, payload) {
	const { data } = await api.patch(`/admin/timetable/${slotId}`, payload);
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
