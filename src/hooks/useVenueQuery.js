import { useTableQuery } from './useTableQuery';

const VENUE_FILTER_KEYS = ['type', 'is_active'];

/**
 * URL-backed state for the admin venues page.
 *
 * @see useTableQuery — the shared implementation.
 */
export function useVenueQuery() {
	return useTableQuery(VENUE_FILTER_KEYS);
}
