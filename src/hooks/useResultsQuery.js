import { useTableQuery } from './useTableQuery';

/**
 * URL-backed state for the results review table.
 *
 * @see useTableQuery — the shared implementation.
 */
export function useResultsQuery() {
	return useTableQuery();
}
