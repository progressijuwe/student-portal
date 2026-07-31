import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	fetchResultDetail,
	fetchResults,
	reviewResults,
} from '../../api/admin';
import { queryKeys } from '../../api/queryKeys';

/**
 * Submitted results for the review table, grouped by course offering.
 */
export function useAdminResults(params) {
	return useQuery({
		queryKey: queryKeys.admin.results(params),
		queryFn: () => fetchResults(params),
		placeholderData: (previous) => previous,
	});
}

/** Individual student marks for one offering — the "View details" drawer. */
export function useResultDetail(offeringId, params, { enabled = true } = {}) {
	return useQuery({
		queryKey: queryKeys.admin.resultDetail(offeringId, params),
		queryFn: () => fetchResultDetail(offeringId, params),
		enabled: enabled && Boolean(offeringId),
	});
}

export function useReviewResults() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: reviewResults,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.admin.results(),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.admin.dashboard(),
			});
		},
	});
}
