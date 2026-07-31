import { useTableQuery } from './useTableQuery';

const STUDENT_FILTER_KEYS = [
	'faculty_id',
	'department_id',
	'level',
	'entry_year',
];

/**
 * URL-backed state for the admin students page.
 *
 * @see useTableQuery — the shared implementation.
 */
export function useStudentQuery() {
	return useTableQuery(STUDENT_FILTER_KEYS);
}
