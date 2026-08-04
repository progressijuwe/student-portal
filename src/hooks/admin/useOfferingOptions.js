import { useMemo } from 'react';
import { useAdminOfferings } from './useAdminOfferings';

/**
 * Course offerings, shaped for a picker.
 *
 * A timetable slot attaches to an *offering*, not a course — the same course
 * runs in different semesters with different lecturers, and only the offering
 * says which one is being scheduled. Scoped to open offerings for the same
 * reason the venue picker is scoped to active rooms.
 */
export function useOfferingOptions(search = '', { sessionId, semester } = {}) {
	const { data, isPending, isError } = useAdminOfferings({
		per_page: 50,
		is_active: true,
		search: search || undefined,
		session_id: sessionId || undefined,
		semester: semester || undefined,
	});

	const options = useMemo(
		() =>
			(data?.data ?? []).map((offering) => ({
				value: String(offering.id),
				label: `${offering.course?.code} — ${offering.course?.title}`,
				hint: [
					offering.session?.name,
					offering.semester === 'first'
						? '1st Semester'
						: '2nd Semester',
					// Named because an unassigned offering has nobody to clash
					// against, so the lecturer conflict check cannot protect it.
					offering.lecturer?.display_name ?? 'No lecturer assigned',
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
