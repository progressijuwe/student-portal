import api from "./axios";

export async function loginRequest({ email, password }) {
	const { data } = await api.post("/auth/login", { email, password });
	return data.data; // { user, token }
}

export async function logoutRequest() {
	const { data } = await api.post("/auth/logout");
	return data;
}
