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
			queryClient.invalidateQueries({
				queryKey: ['student', 'dashboard'],
			});
		},
	});
}
