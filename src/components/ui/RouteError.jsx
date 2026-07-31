import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';

/**
 * Rendered by the router whenever a route's element throws, or when navigation
 * fails. Without an errorElement the router falls back to its own unstyled
 * stack-trace screen, which is not something a student should ever see.
 */
export default function RouteError() {
	const error = useRouteError();

	const status = isRouteErrorResponse(error) ? error.status : null;
	const isChunkError = /dynamically imported module|Loading chunk/i.test(
		error?.message ?? '',
	);

	return (
		<main
			role='alert'
			className='flex flex-col items-center justify-center min-h-screen gap-5 px-6 text-center font-body'
		>
			<h1 className='text-2xl font-semibold text-dark'>
				{status === 404 ? 'Page not found' : 'Something went wrong'}
			</h1>

			<p className='text-sm text-label max-w-md'>
				{isChunkError
					? 'The app was updated while this tab was open. Reloading will pick up the new version.'
					: status === 404
						? "That page doesn't exist, or you don't have access to it."
						: 'An unexpected error occurred. You can try again, or head back to your dashboard.'}
			</p>

			<div className='flex flex-wrap items-center justify-center gap-3'>
				<button
					type='button'
					onClick={() => window.location.reload()}
					className='px-5 py-2.5 rounded-sm bg-brand-red text-white text-sm font-medium'
				>
					Reload
				</button>
				<Link
					to='/login'
					className='px-5 py-2.5 rounded-sm border border-border text-sm font-medium text-dark'
				>
					Back to sign in
				</Link>
			</div>

			{import.meta.env.DEV && error?.message && (
				<pre className='mt-4 max-w-full overflow-x-auto rounded-sm bg-brand p-4 text-left text-xs text-dark'>
					{error.message}
				</pre>
			)}
		</main>
	);
}
