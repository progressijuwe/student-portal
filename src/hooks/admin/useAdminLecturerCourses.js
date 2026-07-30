import { useQuery } from '@tanstack/react-query';
import { fetchLecturerCoursesAdmin } from '../../api/admin';

export function useAdminLecturerCourses(userId, { sessionId }) {
	return useQuery({
		queryKey: ['admin', 'lecturer-courses', userId, sessionId],
		queryFn: () => fetchLecturerCoursesAdmin(userId, { sessionId }),
		enabled: !!userId,
	});
}
