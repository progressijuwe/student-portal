import { useMemo } from 'react';
import { useAdminUsers } from './useAdminUsers';

/**
 * The lecturer roster, shaped for a picker.
 *
 * Asks for a larger page than the lecturers table does so a school with more
 * than twenty staff does not get a silently truncated dropdown, and accepts a
 * search term so the list stays usable past the API's 100-per-page cap.
 */
export function useLecturerOptions(search = '') {
	const { data, isPending, isError } = useAdminUsers({
		role: 'lecturer',
		per_page: 100,
		search: search || undefined,
	});

	const options = useMemo(
		() =>
			(data?.data ?? []).map((lecturer) => ({
				value: String(lecturer.id),
				label: lecturer.lecturer_profile?.display_name ?? lecturer.name,
				hint: [lecturer.staff_id, lecturer.department?.name]
					.filter(Boolean)
					.join(' · '),
			})),
		[data],
	);

	return {
		options,
		isPending,
		isError,
		// The picker warns when there are more matches than it is showing,
		// rather than pretending the list is complete.
		hasMore: (data?.meta?.total ?? 0) > options.length,
	};
}
