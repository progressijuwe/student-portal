import api from './axios';

export async function loginRequest({ email, password }) {
	const { data } = await api.post('/auth/login', { email, password });
	return data.data; // { user, token }
}

export async function logoutRequest() {
	const { data } = await api.post('/auth/logout');
	return data;
}

/**
 * Flags the account as locked out for an administrator to action.
 *
 * There is no emailed reset link — no mail service is configured — so this
 * records the request and the admin issues a new temporary password by hand.
 * The API answers identically whether or not the address exists, so the caller
 * must not branch on the result.
 */
export async function requestPasswordReset(email) {
	const { data } = await api.post('/auth/forgot-password', { email });
	return data;
}

export async function changePasswordRequest({
	currentPassword,
	password,
	passwordConfirmation,
}) {
	const { data } = await api.post('/auth/change-password', {
		current_password: currentPassword,
		password,
		password_confirmation: passwordConfirmation,
	});
	return data;
}
