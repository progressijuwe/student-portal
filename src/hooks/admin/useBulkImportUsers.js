import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bulkImportUsers } from '../../api/admin';

/**
 * Imports a CSV of students or lecturers.
 *
 * Invalidated on success even when some rows failed: a partial import still
 * created accounts, and the table has to show them.
 */
export function useBulkImportUsers() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: bulkImportUsers,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
			queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
			queryClient.invalidateQueries({ queryKey: ['admin', 'activity'] });
		},
	});
}
