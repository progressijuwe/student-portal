import { useTableQuery } from './useTableQuery';

const STUDENT_FILTER_KEYS = [
	'faculty_id',
	'department_id',
	'level',
	'entry_year',
	// Set by the dashboard's "Password resets requested" card, so the link
	// lands on the list already narrowed to the people who are locked out.
	'reset_requested',
];

/**
 * URL-backed state for the admin students page.
 *
 * @see useTableQuery — the shared implementation.
 */
export function useStudentQuery() {
	return useTableQuery(STUDENT_FILTER_KEYS);
}
