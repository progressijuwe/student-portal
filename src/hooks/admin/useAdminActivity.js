import { useQuery } from '@tanstack/react-query';
import { fetchAdminActivity } from '../../api/admin';

export function useAdminActivity() {
	return useQuery({
		queryKey: ['admin', 'activity'],
		queryFn: fetchAdminActivity,
	});
}
