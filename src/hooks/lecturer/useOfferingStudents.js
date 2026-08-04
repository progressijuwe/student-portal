import { useQuery } from '@tanstack/react-query';
import { fetchOfferingStudents } from '../../api/lecturer';

/**
 * The API's ceiling on a class list, chosen to match the cap the batch-grade
 * endpoint puts on its `grades` array. Asking for more would return rows that
 * could not be submitted together anyway, so the two limits are kept equal.
 */
export const CLASS_PAGE_SIZE = 500;

/**
 * The whole class, in one request.
 *
 * A mark sheet is a single document — "Submit Results" posts every row that has
 * been filled in — so fetching it a page at a time would grade only the visible
 * portion. Any class larger than the ceiling is reported through `meta.total`
 * so the sheet can say so out loud rather than quietly working on a subset.
 */
export function useOfferingStudents(offeringId) {
	return useQuery({
		queryKey: ['lecturer', 'offering-students', offeringId],
		queryFn: () =>
			fetchOfferingStudents(offeringId, { perPage: CLASS_PAGE_SIZE }),
		enabled: !!offeringId,
	});
}
