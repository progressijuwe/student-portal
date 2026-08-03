import { useTableQuery } from './useTableQuery';

const OFFERING_FILTER_KEYS = [
	'session_id',
	'semester',
	'faculty_id',
	'department_id',
	'lecturer_id',
	'is_active',
];

/**
 * URL-backed state for the admin course offerings page.
 *
 * @see useTableQuery — the shared implementation.
 */
export function useOfferingQuery() {
	return useTableQuery(OFFERING_FILTER_KEYS);
}
