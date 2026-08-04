import { useQuery } from '@tanstack/react-query';
import { fetchAcademicSessions } from '../api/options';
import { queryKeys } from '../api/queryKeys';

/**
 * The session list every role's session picker reads.
 *
 * Keyed through the factory rather than an ad-hoc `['academic-sessions']`. The
 * factory already declared `options.academicSessions()` and nothing used it, so
 * an invalidation aimed at the declared key would have missed this query
 * entirely — exactly the drift the factory exists to prevent.
 */
export function useAcademicSessions() {
	return useQuery({
		queryKey: queryKeys.options.academicSessions(),
		queryFn: fetchAcademicSessions,
		staleTime: 1000 * 60 * 10, // sessions rarely change; cache longer
	});
}
