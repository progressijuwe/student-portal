import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Keeps list-page state (search, page, filters) in the URL.
 *
 * Putting it in the query string rather than component state means a filtered
 * view is linkable, survives a refresh, and works with browser back/forward.
 *
 * Filters are keyed by the same names the API expects, so a page can forward
 * them straight through without a translation layer.
 */
const DEFAULT_FILTER_KEYS = ['level', 'faculty_id', 'department_id'];

export function useTableQuery(filterKeys = DEFAULT_FILTER_KEYS) {
	const [searchParams, setSearchParams] = useSearchParams();

	const search = searchParams.get('q') || '';
	const page = Number(searchParams.get('page')) || 1;

	const filters = useMemo(
		() =>
			Object.fromEntries(
				filterKeys.map((key) => [key, searchParams.get(key) || '']),
			),
		// searchParams is a new object each render, so key off its serialised form.
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[searchParams.toString(), filterKeys.join(',')],
	);

	const updateParams = useCallback(
		(updates) => {
			setSearchParams(
				(prev) => {
					const next = new URLSearchParams(prev);

					Object.entries(updates).forEach(([key, value]) => {
						if (value) next.set(key, String(value));
						else next.delete(key);
					});

					return next;
				},
				{ replace: true },
			);
		},
		[setSearchParams],
	);

	return {
		search,
		page,
		filters,
		// Changing a search term or a filter always returns to page 1 — staying
		// on page 7 of a now two-page result set shows an empty table.
		setSearch: (q) => updateParams({ q, page: null }),
		setFilters: (next) => updateParams({ ...next, page: null }),
		setPage: (p) => updateParams({ page: p }),
	};
}
