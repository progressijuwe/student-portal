import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import {
	createOffering,
	fetchOfferings,
	updateOffering,
} from '../../api/admin';
import { queryKeys } from '../../api/queryKeys';

export function useAdminOfferings(params) {
	return useQuery({
		queryKey: queryKeys.admin.offerings(params),
		queryFn: () => fetchOfferings(params),
		placeholderData: keepPreviousData, // avoids an empty flash while paging or filtering
	});
}

/**
 * Invalidates every cached offering list after a write.
 *
 * Courses are invalidated too: the admin courses page renders each course's
 * lecturer and enrolment count from its offering for the current session, so a
 * reassignment there is stale the moment an offering changes. The student
 * available-offerings list is left alone — it belongs to a different role and
 * is refetched on that user's own navigation.
 */
function useOfferingMutation(mutationFn) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.admin.offerings(),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.admin.courses(),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.admin.dashboard(),
			});
		},
	});
}

export function useCreateOffering() {
	return useOfferingMutation(createOffering);
}

export function useUpdateOffering() {
	return useOfferingMutation(({ offeringId, payload }) =>
		updateOffering(offeringId, payload),
	);
}
