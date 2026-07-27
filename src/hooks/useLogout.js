import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logoutRequest } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export function useLogout() {
	const { logout } = useAuth();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: logoutRequest,
		onSuccess: () => {
			logout();
			navigate('/login', { replace: true });
		},
		onError: () => {
			// Even if the API call fails (e.g. token already invalid),
			// clear local state so the user isn't stuck logged in on the frontend
			logout();
			navigate('/login', { replace: true });
		},
	});
}
