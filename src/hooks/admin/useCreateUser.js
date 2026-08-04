import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../../api/admin';

export function useCreateUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createUser,
		onSuccess: () => {
			// Was missing: the students and lecturers tables read this key, so a
			// newly created account did not appear until the page was reloaded.
			queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
			queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
			queryClient.invalidateQueries({ queryKey: ['admin', 'activity'] });
		},
	});
}
