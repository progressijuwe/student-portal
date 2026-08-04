import { useTableQuery } from './useTableQuery';

const TIMETABLE_FILTER_KEYS = [
	'session_id',
	'semester',
	'day',
	'venue_id',
	'lecturer_id',
	'is_active',
];

/**
 * URL-backed state for the admin timetable page.
 *
 * @see useTableQuery — the shared implementation.
 */
export function useTimetableQuery() {
	return useTableQuery(TIMETABLE_FILTER_KEYS);
}
