import api from './axios';

export async function fetchProfile() {
	const { data } = await api.get('/profile');
	return data.data;
}

export async function updateProfile(payload) {
	const { data } = await api.patch('/profile', payload);
	return data.data;
}

export async function uploadProfilePhoto(file) {
	const formData = new FormData();
	formData.append('photo', file);

	const { data } = await api.post('/profile/photo', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return data.data;
}

export async function removeProfilePhoto() {
	const { data } = await api.delete('/profile/photo');
	return data;
}
