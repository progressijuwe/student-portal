import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '../api/profile';

export function useUpdateProfile() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateProfile,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] });
		},
	});
}
