import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCourse } from '../../api/admin';

export function useCreateCourse() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createCourse,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
			queryClient.invalidateQueries({ queryKey: ['admin', 'activity'] });
		},
	});
}
