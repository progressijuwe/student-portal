import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../../api/admin';

export function useCreateUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
			queryClient.invalidateQueries({ queryKey: ['admin', 'activity'] });
		},
	});
}
