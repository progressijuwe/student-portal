export function getCurrentSemester(session) {
	if (!session) return null;

	const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

	if (session.first_semester_start && session.first_semester_end) {
		if (
			today >= session.first_semester_start &&
			today <= session.first_semester_end
		) {
			return { key: 'first', label: '1st Semester' };
		}
	}

	if (session.second_semester_start && session.second_semester_end) {
		if (
			today >= session.second_semester_start &&
			today <= session.second_semester_end
		) {
			return { key: 'second', label: '2nd Semester' };
		}
	}

	return null; // between semesters / no active window
}
