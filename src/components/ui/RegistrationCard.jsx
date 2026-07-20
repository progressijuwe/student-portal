import CheckIcon from "../../assets/svg/check.svg?react";
import CloseIcon from "../../assets/svg/close.svg?react";

export default function RegistrationCard({
	registration,
	onView,
	onApprove,
	onReject,
	isPending,
}) {
	return (
		<article className='border border-border rounded-[10px] p-4 flex flex-col gap-3 bg-white'>
			<div className='flex flex-col gap-0.5'>
				<h3 className='font-semibold text-black text-sm'>
					{registration.name}
				</h3>
				<p className='text-xs font-medium text-brand-red'>{registration.id}</p>
			</div>

			<div className='flex gap-6 text-xs text-label'>
				<div className='flex flex-col gap-0.5'>
					<span>Level</span>
					<span className='font-semibold text-black'>
						{registration.level} Lv
					</span>
				</div>
				<div className='flex flex-col gap-0.5'>
					<span>Courses Registered</span>
					<span className='font-semibold text-black'>
						{registration.courses.length} courses
					</span>
				</div>
			</div>

			<div className='flex items-center gap-2'>
				<button
					onClick={() => onView(registration)}
					className='flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition'
				>
					View details
				</button>
				{isPending && (
					<>
						<button
							onClick={() => onApprove(registration)}
							className='p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition'
							aria-label={`Approve ${registration.name}`}
						>
							<CheckIcon className='size-4' />
						</button>
						<button
							onClick={() => onReject(registration)}
							className='p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition'
							aria-label={`Reject ${registration.name}`}
						>
							<CloseIcon className='size-4' />
						</button>
					</>
				)}
			</div>
		</article>
	);
}
