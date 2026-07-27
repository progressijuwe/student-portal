import { useQuery } from '@tanstack/react-query';
import { fetchStudentTimetable } from '../../api/student';

export function useTimetable() {
	return useQuery({
		queryKey: ['student', 'timetable'],
		queryFn: fetchStudentTimetable,
	});
}
