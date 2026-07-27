import { useQuery } from '@tanstack/react-query';
import { fetchAcademicRules } from '../api/options';

export function useAcademicRules() {
	return useQuery({
		queryKey: ['academic-rules'],
		queryFn: fetchAcademicRules,
		staleTime: 1000 * 60 * 10,
	});
}
