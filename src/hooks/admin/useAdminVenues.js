import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { createVenue, fetchVenues, updateVenue } from '../../api/admin';
import { queryKeys } from '../../api/queryKeys';

export function useAdminVenues(params) {
	return useQuery({
		queryKey: queryKeys.admin.venues(params),
		queryFn: () => fetchVenues(params),
		placeholderData: keepPreviousData,
	});
}

/**
 * Invalidates the venue lists and the timetable after a write.
 *
 * The timetable renders each slot's room, so renaming a venue or taking it out
 * of use leaves every slot showing it stale until that cache is dropped too.
 */
function useVenueMutation(mutationFn) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.admin.venues(),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.admin.timetable(),
			});
		},
	});
}

export function useCreateVenue() {
	return useVenueMutation(createVenue);
}

export function useUpdateVenue() {
	return useVenueMutation(({ venueId, payload }) =>
		updateVenue(venueId, payload),
	);
}
