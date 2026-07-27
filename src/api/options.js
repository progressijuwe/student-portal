import api from './axios';

export async function fetchAcademicSessions() {
	const { data } = await api.get('/options/academic-sessions');
	return data.data;
}

export async function fetchAcademicRules() {
	const { data } = await api.get('/options/academic-rules');
	return data.data;
}
