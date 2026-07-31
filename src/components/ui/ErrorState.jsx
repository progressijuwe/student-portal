import { Button } from './Button';

export default function ErrorState({
	title = 'Something went wrong',
	description = 'Please try again.',
	onRetry,
}) {
	return (
		<div
			role='alert'
			className='flex flex-col items-center justify-center text-center py-10 gap-4'
		>
			<h3 className='text-base font-semibold text-black'>{title}</h3>
			<p className='text-sm text-label max-w-md'>{description}</p>
			{onRetry && <Button onClick={onRetry}>Retry</Button>}
		</div>
	);
}
