import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitRegistration } from '../../api/student';

export function useSubmitRegistration() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: submitRegistration,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['student', 'available-offerings'],
			});
			// Was missing: the "My Registrations" tab reads this key, so a
			// student who submitted and switched tabs saw the list as it was
			// before they registered.
			queryClient.invalidateQueries({
				queryKey: ['student', 'enrollments'],
			});
			queryClient.invalidateQueries({
				queryKey: ['student', 'dashboard'],
			});
		},
	});
}
