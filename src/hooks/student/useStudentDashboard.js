import { useQuery } from '@tanstack/react-query';
import { fetchStudentDashboard } from '../../api/student';

export function useStudentDashboard(options = {}) {
	return useQuery({
		queryKey: ['student', 'dashboard'],
		queryFn: fetchStudentDashboard,
		...options,
	});
}
