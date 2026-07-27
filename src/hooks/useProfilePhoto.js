import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadProfilePhoto, removeProfilePhoto } from '../api/profile';

export function useUploadProfilePhoto() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: uploadProfilePhoto,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] });
		},
	});
}

export function useRemoveProfilePhoto() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: removeProfilePhoto,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] });
		},
	});
}
