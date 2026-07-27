import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export function useLogin() {
	const { login } = useAuth();

	return useMutation({
		mutationFn: loginRequest,
		onSuccess: (data) => {
			login(data.user, data.token);
		},
	});
}
