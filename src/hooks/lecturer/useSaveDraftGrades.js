import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveDraftGrades } from '../../api/lecturer';

export function useSaveDraftGrades() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: saveDraftGrades,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['lecturer', 'offering-students'],
			});
		},
	});
}
