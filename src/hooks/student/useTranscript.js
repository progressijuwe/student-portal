import { useQuery } from '@tanstack/react-query';
import { fetchTranscript } from '../../api/student';
import { queryKeys } from '../../api/queryKeys';

/**
 * Fetched on demand rather than with the page.
 *
 * The transcript is only needed when a student asks to see or download it, and
 * it is the heaviest read a student can make — every approved grade they have
 * ever been given. `enabled` keeps it off the results page's critical path.
 */
export function useTranscript({ enabled = false } = {}) {
	return useQuery({
		queryKey: queryKeys.student.transcript(),
		queryFn: fetchTranscript,
		enabled,
		staleTime: 5 * 60 * 1000,
	});
}
