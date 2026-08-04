import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import {
	createAcademicSession,
	fetchAdminSessions,
	setCurrentAcademicSession,
	updateAcademicSession,
} from '../../api/admin';
import { queryKeys } from '../../api/queryKeys';

export function useAdminSessions(params) {
	return useQuery({
		queryKey: queryKeys.admin.sessions(params),
		queryFn: () => fetchAdminSessions(params),
		placeholderData: keepPreviousData,
	});
}

/**
 * Editing a session changes the list and the shared session picker, but not
 * what the portal considers "now".
 */
function useSessionMutation(mutationFn) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.admin.sessions(),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.options.academicSessions(),
			});
		},
	});
}

export function useCreateSession() {
	return useSessionMutation(createAcademicSession);
}

export function useUpdateSession() {
	return useSessionMutation(({ sessionId, payload }) =>
		updateAcademicSession(sessionId, payload),
	);
}

/**
 * Promoting a session invalidates almost everything.
 *
 * Dashboards, course lists, registration, grading and timetables all resolve
 * the current session before they resolve anything else, so after a rollover
 * essentially every cached response describes the wrong year. Clearing the
 * three role namespaces wholesale is correct here precisely because the blast
 * radius is that wide — a narrower invalidation would leave some screen showing
 * last session's data with no indication it was stale.
 */
export function useSetCurrentSession() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: setCurrentAcademicSession,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.admin.all() });
			queryClient.invalidateQueries({
				queryKey: queryKeys.student.all(),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.lecturer.all(),
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.options.academicSessions(),
			});
		},
	});
}
