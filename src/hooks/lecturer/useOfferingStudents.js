import { useQuery } from '@tanstack/react-query';
import { fetchOfferingStudents } from '../../api/lecturer';

export function useOfferingStudents(offeringId) {
	return useQuery({
		queryKey: ['lecturer', 'offering-students', offeringId],
		queryFn: () => fetchOfferingStudents(offeringId),
		enabled: !!offeringId,
	});
}
