import { useMutation, useQueryClient } from '@tanstack/react-query';
import { batchSubmitGrades } from '../../api/lecturer';

export function useBatchSubmitGrades() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: batchSubmitGrades,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['lecturer', 'offering-students'],
			});
		},
	});
}
