import CheckIcon from '../../assets/svg/check.svg?react';
import CloseIcon from '../../assets/svg/close.svg?react';

export default function ResultRow({
	result,
	index,
	isPending,
	onApprove,
	onReject,
	onView,
}) {
	return (
		<tr className='border-t border-border text-sm'>
			<td className='py-4 px-3 text-label'>{index}</td>
			<td className='py-4 px-3'>
				<p className='font-semibold text-brand-red'>{result.code}</p>
				<p className='text-label text-xs'>{result.title}</p>
			</td>
			<td className='py-4 px-3'>{result.lecturer}</td>
			<td className='py-4 px-3'>{result.students} Students</td>
			<td className='py-4 px-3 font-semibold text-brand-red'>
				{result.avgScore.toFixed(1)}%
			</td>
			<td className='py-4 px-3'>
				<div className='flex items-center gap-2'>
					<button
						onClick={() => onView?.(result)}
						className='px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition text-nowrap'
					>
						View details
					</button>
					{isPending && (
						<>
							<button
								onClick={() => onApprove?.(result)}
								aria-label='Approve'
								className='p-1.5 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 transition'
							>
								<CheckIcon className='size-4' />
							</button>
							<button
								onClick={() => onReject?.(result)}
								aria-label='Reject'
								className='p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition'
							>
								<CloseIcon className='size-4' />
							</button>
						</>
					)}
				</div>
			</td>
		</tr>
	);
}
