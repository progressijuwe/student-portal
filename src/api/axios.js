import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// Attach the auth token to every request
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("auth_token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Handle global response errors (e.g. auto-logout on 401)
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem("auth_token");
			localStorage.removeItem("auth_user");
			// Avoid a hard redirect loop if we're already on the login page
			if (!window.location.pathname.includes("/login")) {
				window.location.href = "/login";
			}
		}
		return Promise.reject(error);
	},
);

export default api;
