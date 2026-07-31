import { useTableQuery } from './useTableQuery';

const LECTURER_FILTER_KEYS = ['faculty_id', 'department_id'];

/**
 * URL-backed state for the admin lecturers page.
 *
 * @see useTableQuery — the shared implementation.
 */
export function useLecturerQuery() {
	return useTableQuery(LECTURER_FILTER_KEYS);
}
