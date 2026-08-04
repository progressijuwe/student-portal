import api from './axios';

/**
 * Notifications live under each role's own prefix.
 *
 * The three endpoints are identical — one controller serves all of them — but
 * the paths differ because each sits behind its own role middleware, so the
 * caller has to say which one it is.
 */
function basePath(role) {
	return `/${role}/notifications`;
}

export async function fetchNotifications(role) {
	const { data } = await api.get(basePath(role));

	return {
		notifications: data.data ?? [],
		// The unread count is computed server-side across *all* notifications,
		// not just the page returned, so the badge stays honest past page one.
		unreadCount: data.meta?.unread_count ?? 0,
		meta: data.meta,
	};
}

export async function markNotificationRead(role, id) {
	const { data } = await api.patch(`${basePath(role)}/${id}/read`);
	return data;
}

export async function markAllNotificationsRead(role) {
	const { data } = await api.patch(`${basePath(role)}/read-all`);
	return data;
}
