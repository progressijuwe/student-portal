import { useQuery } from '@tanstack/react-query';
import { fetchStudentTimetable } from '../api/student';
import { fetchLecturerTimetable } from '../api/lecturer';
import { queryKeys } from '../api/queryKeys';

/**
 * The signed-in user's weekly schedule, whichever side of it they are on.
 *
 * Students and lecturers read from different endpoints but get the same shape
 * back — grouped by day — so the profile page can offer one download without
 * caring which role is looking at it.
 */
export function useClassSchedule(role, { enabled = true } = {}) {
	const isLecturer = role === 'lecturer';

	return useQuery({
		queryKey: isLecturer
			? queryKeys.lecturer.timetable()
			: queryKeys.student.timetable(),
		queryFn: isLecturer ? fetchLecturerTimetable : fetchStudentTimetable,
		enabled: enabled && (role === 'student' || isLecturer),
	});
}
