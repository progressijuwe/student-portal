import { useQuery } from '@tanstack/react-query';
import { fetchStudentGradesAdmin } from '../../api/admin';

export function useAdminStudentGrades(userId, { sessionId, semester }) {
	return useQuery({
		queryKey: ['admin', 'student-grades', userId, sessionId, semester],
		queryFn: () => fetchStudentGradesAdmin(userId, { sessionId, semester }),
		enabled: !!userId && !!semester,
	});
}
