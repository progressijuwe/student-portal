import { createContext } from 'react';

/**
 * The auth context object itself.
 *
 * Kept apart from both the provider component and the useAuth hook so that
 * AuthContext.jsx exports nothing but a component — the condition Vite's fast
 * refresh requires to hot-swap a module instead of reloading the page.
 */
export const AuthContext = createContext(null);
