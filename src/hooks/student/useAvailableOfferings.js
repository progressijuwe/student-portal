import { useQuery } from '@tanstack/react-query';
import { fetchAvailableOfferings } from '../../api/student';

export function useAvailableOfferings({ semester }) {
	return useQuery({
		queryKey: ['student', 'available-offerings', semester],
		queryFn: () => fetchAvailableOfferings({ semester }),
		enabled: !!semester,
	});
}
