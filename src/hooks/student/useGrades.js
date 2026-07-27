import { useQuery } from '@tanstack/react-query';
import { fetchStudentGrades } from '../../api/student';

export function useGrades({ sessionId, semester }) {
	return useQuery({
		queryKey: ['student', 'grades', sessionId, semester],
		queryFn: () => fetchStudentGrades({ sessionId, semester }),
		enabled: !!sessionId && !!semester,
	});
}
