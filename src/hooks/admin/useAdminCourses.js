import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	createCourse,
	fetchCourses,
	setCourseActive,
	updateCourse,
} from '../../api/admin';
import { queryKeys } from '../../api/queryKeys';

export function useAdminCourses(params) {
	return useQuery({
		queryKey: queryKeys.admin.courses(params),
		queryFn: () => fetchCourses(params),
		placeholderData: (previous) => previous,
	});
}

/** Invalidates every cached course list after a write. */
function useCourseMutation(mutationFn) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.admin.courses(),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.admin.dashboard(),
			});
		},
	});
}

export function useCreateCourse() {
	return useCourseMutation(createCourse);
}

export function useUpdateCourse() {
	return useCourseMutation(({ courseId, payload }) =>
		updateCourse(courseId, payload),
	);
}

/**
 * Courses are never hard-deleted — an inactive course keeps its offerings,
 * enrollments and grades intact, which a delete would orphan.
 */
export function useSetCourseActive() {
	return useCourseMutation(({ courseId, isActive }) =>
		setCourseActive(courseId, isActive),
	);
}
