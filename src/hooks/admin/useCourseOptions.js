import { useMemo } from 'react';
import { useAdminCourses } from './useAdminCourses';

/**
 * The course catalogue, shaped for a picker.
 *
 * Scoped to active courses: a deactivated course is one the school has stopped
 * running, so offering it again is almost certainly a mistake — and the
 * catalogue is the one list here big enough that the search has to reach the
 * database rather than filter an already-fetched page.
 */
export function useCourseOptions(search = '') {
	const { data, isPending, isError } = useAdminCourses({
		per_page: 50,
		is_active: true,
		search: search || undefined,
	});

	const options = useMemo(
		() =>
			(data?.data ?? []).map((course) => ({
				value: String(course.id),
				label: `${course.code} — ${course.title}`,
				hint: [
					course.department?.name,
					course.level,
					`${course.credit_units} units`,
				]
					.filter(Boolean)
					.join(' · '),
			})),
		[data],
	);

	return {
		options,
		isPending,
		isError,
		hasMore: (data?.meta?.total ?? 0) > options.length,
	};
}
