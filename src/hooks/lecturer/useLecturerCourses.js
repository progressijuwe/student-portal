import { useQuery } from '@tanstack/react-query';
import { fetchLecturerCourses } from '../../api/lecturer';

export function useLecturerCourses(options = {}) {
	return useQuery({
		queryKey: ['lecturer', 'courses'],
		queryFn: fetchLecturerCourses,
		...options,
	});
}
