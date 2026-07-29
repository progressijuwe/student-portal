import { useQuery } from '@tanstack/react-query';
import { fetchLecturerDashboard } from '../../api/lecturer';

export function useLecturerDashboard(options = {}) {
	return useQuery({
		queryKey: ['lecturer', 'dashboard'],
		queryFn: fetchLecturerDashboard,
		...options,
	});
}
