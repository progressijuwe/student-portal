import { useQuery } from '@tanstack/react-query';
import { fetchAcademicSessions } from '../api/options';

export function useAcademicSessions() {
	return useQuery({
		queryKey: ['academic-sessions'],
		queryFn: fetchAcademicSessions,
		staleTime: 1000 * 60 * 10, // sessions rarely change; cache longer
	});
}
