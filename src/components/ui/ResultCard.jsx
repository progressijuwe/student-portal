import CheckIcon from '../../assets/svg/check.svg?react';
import CloseIcon from '../../assets/svg/close.svg?react';

export default function ResultCard({
	result,
	isPending,
	onApprove,
	onReject,
	onView,
}) {
	return (
		<article className='border border-border rounded-[10px] p-4 flex flex-col gap-3 bg-white'>
			<div className='flex items-start justify-between'>
				<div>
					<p className='font-semibold text-brand-red text-sm'>
						{result.code}
					</p>
					<p className='text-label text-xs'>{result.title}</p>
				</div>
				<span className='font-semibold text-brand-red text-sm'>
					{result.avgScore.toFixed(1)}%
				</span>
			</div>

			<div className='grid grid-cols-2 gap-y-1 text-xs text-label'>
				<span>Lecturer</span>
				<span className='text-right text-black'>{result.lecturer}</span>
				<span>Students</span>
				<span className='text-right text-black'>
					{result.students} Students
				</span>
			</div>

			<div className='flex items-center gap-2 pt-1'>
				<button
					onClick={() => onView?.(result)}
					className='flex-1 px-3 py-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition'
				>
					View details
				</button>
				{isPending && (
					<>
						<button
							onClick={() => onApprove?.(result)}
							aria-label='Approve'
							className='p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition'
						>
							<CheckIcon className='size-4' />
						</button>
						<button
							onClick={() => onReject?.(result)}
							aria-label='Reject'
							className='p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition'
						>
							<CloseIcon className='size-4' />
						</button>
					</>
				)}
			</div>
		</article>
	);
}
