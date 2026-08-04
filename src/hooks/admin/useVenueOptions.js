import { useMemo } from 'react';
import { useAdminVenues } from './useAdminVenues';

/**
 * Bookable rooms, shaped for a picker.
 *
 * Scoped to active venues: an inactive room is one the school has taken out of
 * use, so scheduling a class into it is a mistake the picker should not offer.
 */
export function useVenueOptions(search = '') {
	const { data, isPending, isError } = useAdminVenues({
		per_page: 100,
		is_active: true,
		search: search || undefined,
	});

	const options = useMemo(
		() =>
			(data?.data ?? []).map((venue) => ({
				value: String(venue.id),
				label: venue.building
					? `${venue.code} — ${venue.name}, ${venue.building}`
					: `${venue.code} — ${venue.name}`,
				hint: `Seats ${venue.capacity}`,
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
