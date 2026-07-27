import { useQuery } from '@tanstack/react-query';
import { fetchStudentCourses } from '../../api/student';

export function useCourses() {
	return useQuery({
		queryKey: ['student', 'courses'],
		queryFn: fetchStudentCourses,
	});
}
