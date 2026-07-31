import { useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProfile } from '../api/profile';
import { queryKeys } from '../api/queryKeys';
import { AuthContext } from './authContextInstance';
import {
	TOKEN_STORAGE_KEY,
	USER_STORAGE_KEY,
	clearStoredSession,
	getStoredToken,
} from '../api/axios';

/**
 * Reads the cached user for first paint only.
 *
 * localStorage is a cache, never the source of truth: a user whose role changed
 * or whose account was disabled would otherwise keep the old UI until they
 * happened to hit a 401.
 */
function readCachedUser() {
	const stored = localStorage.getItem(USER_STORAGE_KEY);

	if (!stored) return null;

	try {
		return JSON.parse(stored);
	} catch {
		clearStoredSession();
		return null;
	}
}

export function AuthProvider({ children }) {
	const queryClient = useQueryClient();
	const [cachedUser, setCachedUser] = useState(readCachedUser);
	const [hasToken, setHasToken] = useState(() => Boolean(getStoredToken()));

	// Revalidate against the server whenever we hold a token. This is the
	// authoritative answer to "who is this and what may they see".
	const {
		data: serverUser,
		isLoading,
		isError,
	} = useQuery({
		queryKey: queryKeys.auth.me(),
		queryFn: fetchProfile,
		enabled: hasToken,
		staleTime: 5 * 60 * 1000,
		retry: false,
	});

	// Keep the first-paint cache in step with what the server just told us.
	useEffect(() => {
		if (serverUser) {
			localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(serverUser));
			setCachedUser(serverUser);
		}
	}, [serverUser]);

	const login = (userData, token) => {
		localStorage.setItem(TOKEN_STORAGE_KEY, token);
		localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
		setCachedUser(userData);
		setHasToken(true);
		queryClient.setQueryData(queryKeys.auth.me(), userData);
	};

	const logout = () => {
		clearStoredSession();
		setCachedUser(null);
		setHasToken(false);

		// Drop every cached response. Without this the next person to sign in on
		// this browser briefly sees the previous user's data.
		queryClient.clear();
	};

	const value = useMemo(
		() => ({
			user: serverUser ?? cachedUser,
			// Only block on the network when we have nothing cached to render.
			loading: hasToken && isLoading && !cachedUser,
			isAuthenticated: hasToken && !isError,
			login,
			logout,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[serverUser, cachedUser, hasToken, isLoading, isError],
	);

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}
