import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export function useStudentQuery() {
	const [searchParams, setSearchParams] = useSearchParams();

	const search = searchParams.get('q') || '';
	const page = Number(searchParams.get('page')) || 1;

	const filters = {
		faculty_id: searchParams.get('faculty_id') || '',
		department_id: searchParams.get('department_id') || '',
		level: searchParams.get('level') || '',
	};

	const updateParams = useCallback(
		(updates) => {
			setSearchParams((prev) => {
				const next = new URLSearchParams(prev);
				Object.entries(updates).forEach(([key, value]) => {
					if (value) next.set(key, value);
					else next.delete(key);
				});
				return next;
			});
		},
		[setSearchParams],
	);

	return {
		search,
		page,
		filters,
		setSearch: (q) => updateParams({ q, page: null }),
		setFilters: (f) => updateParams({ ...f, page: null }),
		setPage: (p) => updateParams({ page: String(p) }),
	};
}
