import { useQuery } from '@tanstack/react-query';
import { fetchMyEnrollments } from '../../api/student';

export function useMyEnrollments({ sessionId, semester }) {
	return useQuery({
		queryKey: ['student', 'enrollments', sessionId, semester],
		queryFn: () => fetchMyEnrollments({ sessionId, semester }),
		enabled: !!semester,
	});
}
