export function getErrorMessage(error, fallbackMessages = {}) {
	if (!error) return null;

	if (error.response) {
		const { status, data } = error.response;

		if (status === 422 && data?.errors) {
			const firstError = Object.values(data.errors)[0]?.[0];
			return (
				firstError ??
				data.message ??
				'Please check your details and try again.'
			);
		}

		if (fallbackMessages[status]) return fallbackMessages[status];

		if (status >= 500) {
			return 'Something went wrong on our end. Please try again shortly.';
		}

		return data?.message ?? 'Something went wrong. Please try again.';
	}

	if (error.request) {
		return "Can't reach the server. Please check your connection and try again.";
	}

	return 'Something went wrong. Please try again.';
}
