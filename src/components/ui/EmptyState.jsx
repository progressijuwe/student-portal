export default function EmptyState({
	title = 'No data available',
	description = 'There’s nothing to display right now.',
	action,
}) {
	return (
		<div className='w-full flex flex-col items-center justify-center py-16 text-center'>
			<div className='flex flex-col gap-2 max-w-sm'>
				<h3 className='text-lg font-semibold text-black'>{title}</h3>
				<p className='text-sm text-label'>{description}</p>
				{action && <div className='mt-4'>{action}</div>}
			</div>
		</div>
	);
}
