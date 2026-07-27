import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Restore session from localStorage on refresh
		const storedUser = localStorage.getItem("auth_user");
		const token = localStorage.getItem("auth_token");

		if (storedUser && token) {
			try {
				setUser(JSON.parse(storedUser));
			} catch {
				localStorage.removeItem("auth_user");
				localStorage.removeItem("auth_token");
			}
		}
		setLoading(false);
	}, []);

	const login = (userData, token) => {
		localStorage.setItem("auth_user", JSON.stringify(userData));
		localStorage.setItem("auth_token", token);
		setUser(userData);
	};

	const logout = () => {
		localStorage.removeItem("auth_user");
		localStorage.removeItem("auth_token");
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
