import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchRegistrations, reviewRegistrations } from '../../api/admin';
import { queryKeys } from '../../api/queryKeys';

/**
 * Course registrations for the review table, grouped by student server-side.
 *
 * Pagination, filtering and the tab counts all come from the API — the previous
 * implementation loaded a fixture array and sliced it in the browser, which
 * cannot work against a real dataset.
 */
export function useAdminRegistrations(params) {
	return useQuery({
		queryKey: queryKeys.admin.registrations(params),
		queryFn: () => fetchRegistrations(params),
		placeholderData: (previous) => previous, // keep the table stable while paging
	});
}

export function useReviewRegistrations() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: reviewRegistrations,
		onSuccess: () => {
			// Both the registration list and the dashboard's pending counter
			// change as a result of this action.
			queryClient.invalidateQueries({
				queryKey: queryKeys.admin.registrations(),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.admin.dashboard(),
			});
		},
	});
}
