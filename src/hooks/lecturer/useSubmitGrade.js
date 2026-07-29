import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitGrade } from '../../api/lecturer';

export function useSubmitGrade() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: submitGrade,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['lecturer', 'offering-students'],
			});
		},
	});
}
