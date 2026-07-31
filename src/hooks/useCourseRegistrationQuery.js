import { useTableQuery } from './useTableQuery';

/**
 * URL-backed state for the course registration review table.
 *
 * @see useTableQuery — the shared implementation.
 */
export function useCourseRegistrationQuery() {
	return useTableQuery();
}
