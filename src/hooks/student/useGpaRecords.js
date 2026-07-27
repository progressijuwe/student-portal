import { useQuery } from '@tanstack/react-query';
import { fetchGpaRecords } from '../../api/student';

export function useGpaRecords() {
	return useQuery({
		queryKey: ['student', 'gpa-records'],
		queryFn: fetchGpaRecords,
	});
}
