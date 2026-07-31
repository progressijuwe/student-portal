import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

/**
 * Called when the API rejects our credentials.
 *
 * Registered from main.jsx rather than imported here: this module is imported
 * by every api/*.js file, which the router's pages import in turn, so importing
 * the router back into it would be a cycle. A registration hook keeps the
 * dependency pointing one way.
 */
let onUnauthorized = null;

export function setUnauthorizedHandler(handler) {
	onUnauthorized = handler;
}

export const TOKEN_STORAGE_KEY = 'auth_token';
export const USER_STORAGE_KEY = 'auth_user';

export function getStoredToken() {
	return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function clearStoredSession() {
	localStorage.removeItem(TOKEN_STORAGE_KEY);
	localStorage.removeItem(USER_STORAGE_KEY);
}

api.interceptors.request.use((config) => {
	const token = getStoredToken();

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error.response?.status;

		if (status === 401) {
			clearStoredSession();

			// Previously this did `window.location.href = '/login'`, a full page
			// reload that threw away React state and the whole query cache — and
			// its guard was a substring check on the pathname, so any URL merely
			// containing "login" skipped the redirect. Handing off to the router
			// keeps it a client-side navigation and lets the handler clear the
			// cache deliberately.
			onUnauthorized?.();
		}

		return Promise.reject(error);
	},
);

export default api;
