import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import {
	createTimetableSlot,
	fetchTimetableSlots,
	updateTimetableSlot,
} from '../../api/admin';
import { queryKeys } from '../../api/queryKeys';

export function useAdminTimetable(params) {
	return useQuery({
		queryKey: queryKeys.admin.timetable(params),
		queryFn: () => fetchTimetableSlots(params),
		placeholderData: keepPreviousData,
	});
}

/**
 * Any change to a slot changes what students and lecturers see on their own
 * timetable pages, so those caches go too — an admin moving a class and then
 * checking the student view should not be shown the old room.
 */
function useTimetableMutation(mutationFn) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.admin.timetable(),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.student.timetable(),
			});
			queryClient.invalidateQueries({ queryKey: ['lecturer'] });
		},
	});
}

export function useCreateTimetableSlot() {
	return useTimetableMutation(createTimetableSlot);
}

export function useUpdateTimetableSlot() {
	return useTimetableMutation(({ slotId, payload }) =>
		updateTimetableSlot(slotId, payload),
	);
}
