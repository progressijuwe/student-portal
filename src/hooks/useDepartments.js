import { useQuery } from '@tanstack/react-query';
import { fetchDepartments } from '../api/admin';
import { queryKeys } from '../api/queryKeys';

/**
 * Faculties with their departments. Reference data — rarely changes, so it is
 * cached aggressively and shared by every filter bar and user form.
 */
export function useDepartments() {
	return useQuery({
		queryKey: queryKeys.options.departments(),
		queryFn: fetchDepartments,
		staleTime: 10 * 60 * 1000,
	});
}
