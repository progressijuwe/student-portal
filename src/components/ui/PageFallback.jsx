/**
 * Suspense fallback for lazily loaded route chunks.
 *
 * Deliberately a skeleton rather than a spinner or bare "Loading..." — it
 * occupies roughly the same space the page will, so the layout does not jump
 * when the chunk resolves.
 */
export default function PageFallback() {
	return (
		<div
			className='flex flex-col gap-5 px-5 py-8 lg:px-8 lg:py-6'
			role='status'
			aria-live='polite'
		>
			<span className='sr-only'>Loading page…</span>
			<div className='h-8 w-64 max-w-full animate-pulse rounded-[10px] bg-brand' />
			<div className='flex flex-col gap-4'>
				{[0, 1, 2, 3].map((row) => (
					<div
						key={row}
						className='h-16 w-full animate-pulse rounded-[10px] bg-brand'
					/>
				))}
			</div>
		</div>
	);
}
