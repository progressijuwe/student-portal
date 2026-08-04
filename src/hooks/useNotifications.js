import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	fetchNotifications,
	markAllNotificationsRead,
	markNotificationRead,
} from '../api/notifications';
import { queryKeys } from '../api/queryKeys';
import { useAuth } from '../context/useAuth';

/** Roles that have a notifications endpoint. */
const SUPPORTED_ROLES = ['student', 'lecturer', 'admin'];

/**
 * The signed-in user's notifications.
 *
 * Polled rather than pushed. There is no realtime service configured and this
 * is not the place to add one, so a slow interval keeps the badge roughly
 * current without a websocket: a grade released while the tab sits open shows
 * up within the minute. `refetchOnWindowFocus` is disabled globally, so the
 * interval is the only thing keeping it fresh.
 */
export function useNotifications() {
	const { user } = useAuth();
	const role = user?.role;
	const enabled = SUPPORTED_ROLES.includes(role);

	const query = useQuery({
		queryKey: queryKeys.notifications.list(role),
		queryFn: () => fetchNotifications(role),
		enabled,
		refetchInterval: 60 * 1000,
		staleTime: 30 * 1000,
	});

	return {
		notifications: query.data?.notifications ?? [],
		unreadCount: query.data?.unreadCount ?? 0,
		isPending: query.isPending,
		isError: query.isError,
		isSupported: enabled,
	};
}

/**
 * Marking read refetches rather than patching the cache by hand.
 *
 * The unread count is computed server-side across every notification, not just
 * the page on screen, so decrementing it locally would drift from the truth as
 * soon as there was more than one page.
 */
export function useMarkNotificationRead() {
	const { user } = useAuth();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id) => markNotificationRead(user?.role, id),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: queryKeys.notifications.list(user?.role),
			}),
	});
}

export function useMarkAllNotificationsRead() {
	const { user } = useAuth();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => markAllNotificationsRead(user?.role),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: queryKeys.notifications.list(user?.role),
			}),
	});
}
