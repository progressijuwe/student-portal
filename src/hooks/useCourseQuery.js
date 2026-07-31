import { useTableQuery } from './useTableQuery';

const COURSE_FILTER_KEYS = [
	'level',
	'faculty_id',
	'department_id',
	'semester',
	'type',
];

/**
 * URL-backed state for the admin courses page.
 *
 * @see useTableQuery — the shared implementation.
 */
export function useCourseQuery() {
	return useTableQuery(COURSE_FILTER_KEYS);
}
