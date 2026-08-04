import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';
import { resetUserPassword } from '../../api/admin';
import { queryKeys } from '../../api/queryKeys';

async function updateUser({ id, ...payload }) {
	const { data } = await api.patch(`/admin/users/${id}`, payload);
	return data.data;
}

/**
 * Archives the account. The API soft-deletes and revokes the user's tokens, so
 * access stops immediately while academic records referencing them survive.
 */
async function deleteUser(id) {
	const { data } = await api.delete(`/admin/users/${id}`);
	return data;
}

/** Anything that changes a user also changes the lists and counters showing them. */
function useUserMutation(mutationFn) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn,
		onSuccess: () => {
			// Prefix match: covers every cached page and filter combination.
			queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
			queryClient.invalidateQueries({
				queryKey: queryKeys.admin.dashboard(),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.admin.activity(),
			});
		},
	});
}

export function useUpdateUser() {
	return useUserMutation(updateUser);
}

export function useDeleteUser() {
	return useUserMutation(deleteUser);
}

/**
 * Issues a new temporary password and clears any outstanding reset request, so
 * the "Reset requested" badge and the dashboard counter both fall away once the
 * admin has acted.
 */
export function useResetUserPassword() {
	return useUserMutation(resetUserPassword);
}
