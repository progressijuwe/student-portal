import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchUsers } from '../../api/admin';

export function useAdminUsers(params) {
	return useQuery({
		queryKey: ['admin', 'users', params],
		queryFn: () => fetchUsers(params),
		placeholderData: keepPreviousData, // avoids flicker/empty state while switching pages/filters
	});
}
