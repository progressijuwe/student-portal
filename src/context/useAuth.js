import { useContext } from 'react';
import { AuthContext } from './authContextInstance';

/**
 * Access the authenticated user and the login/logout actions.
 *
 * Lives in its own module so AuthContext.jsx exports only components — a file
 * that mixes component and non-component exports breaks Vite's fast refresh,
 * forcing a full reload (and a loss of app state) on every edit.
 */
export function useAuth() {
	const context = useContext(AuthContext);

	if (context === null) {
		throw new Error('useAuth must be used within an AuthProvider.');
	}

	return context;
}
