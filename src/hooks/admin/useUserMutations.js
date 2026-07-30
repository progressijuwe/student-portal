import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';

async function updateUser({ id, ...payload }) {
	const { data } = await api.patch(`/admin/users/${id}`, payload);
	return data.data;
}

async function deleteUser(id) {
	const { data } = await api.delete(`/admin/users/${id}`);
	return data;
}

export function useUpdateUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
			queryClient.invalidateQueries({ queryKey: ['admin', 'activity'] });
		},
	});
}

export function useDeleteUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
			queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
		},
	});
}
