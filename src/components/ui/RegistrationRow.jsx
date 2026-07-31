import ViewIcon from '../../assets/svg/view.svg?react';
import CheckIcon from '../../assets/svg/check.svg?react';
import CloseIcon from '../../assets/svg/close.svg?react';

export default function RegistrationRow({
	registration,
	index,
	onView,
	onApprove,
	onReject,
	isPending,
}) {
	return (
		<tr className='border-t border-border text-sm'>
			<td className='py-4 px-3'>{index}</td>
			<td className='py-4 px-3 font-semibold'>{registration.name}</td>
			<td className='py-4 px-3 font-semibold text-brand-red'>
				{registration.id}
			</td>
			<td className='py-4 px-3'>{registration.level} Lv</td>
			<td className='py-4 px-3'>{registration.courses.length} Courses</td>
			<td className='py-4 px-3'>
				<div className='flex items-center gap-2'>
					<button
						onClick={() => onView(registration)}
						className='bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition'
						aria-label={`View details for ${registration.name}`}
					>
						View details
					</button>
					{isPending && (
						<>
							<button
								onClick={() => onApprove(registration)}
								className='p-1.5 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 transition'
								aria-label={`Approve ${registration.name}`}
							>
								<CheckIcon className='size-4' />
							</button>
							<button
								onClick={() => onReject(registration)}
								className='p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition'
								aria-label={`Reject ${registration.name}`}
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
