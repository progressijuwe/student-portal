import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { setUnauthorizedHandler } from './api/axios';
import { router } from './router';
import '@fontsource-variable/inter';
import './styles/globals.css';

// Dev-only, and code-split so the devtools bundle never reaches production.
const ReactQueryDevtools = lazy(() =>
	import('@tanstack/react-query-devtools').then((module) => ({
		default: module.ReactQueryDevtools,
	})),
);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// A 401 or 403 will not succeed on retry — only retry transient
			// failures, and never more than twice.
			retry: (failureCount, error) => {
				const status = error?.response?.status;

				if (status && status >= 400 && status < 500) return false;

				return failureCount < 2;
			},
			refetchOnWindowFocus: false,
			staleTime: 60 * 1000,
		},
		mutations: {
			retry: false,
		},
	},
});

// The axios interceptor cannot import the router directly without creating an
// import cycle, so it calls back into here instead.
setUnauthorizedHandler(() => {
	queryClient.clear();

	if (!window.location.pathname.startsWith('/login')) {
		router.navigate('/login', { replace: true });
	}
});

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
			{import.meta.env.DEV && (
				<Suspense fallback={null}>
					<ReactQueryDevtools initialIsOpen={false} />
				</Suspense>
			)}
		</QueryClientProvider>
	</StrictMode>,
);
