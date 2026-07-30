import { useQuery } from '@tanstack/react-query';
import { fetchUserSummary } from '../../api/admin';

export function useUserSummary(userId) {
	return useQuery({
		queryKey: ['admin', 'user-summary', userId],
		queryFn: () => fetchUserSummary(userId),
		enabled: !!userId,
	});
}
