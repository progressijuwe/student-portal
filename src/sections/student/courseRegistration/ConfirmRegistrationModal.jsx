import Modal from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';

/**
 * Last look before the registration is submitted.
 *
 * Registration happens once per semester, so this is not a formality — after
 * submitting, the student cannot change their selection themselves. The dialog
 * lists exactly what is being sent and says plainly what happens next, rather
 * than asking a bare "are you sure?".
 */
export default function ConfirmRegistrationModal({
	selected,
	totalUnits,
	minUnits,
	maxUnits,
	sessionName,
	semesterLabel,
	isSubmitting,
	error,
	onConfirm,
	onClose,
}) {
	return (
		<Modal
			heading='Confirm your registration'
			description={[sessionName, semesterLabel]
				.filter(Boolean)
				.join(' · ')}
			onClose={onClose}
		>
			<div className='flex flex-col gap-5 px-4 pb-4'>
				<p className='text-sm'>
					You are registering for{' '}
					<span className='font-semibold'>
						{selected.length} course
						{selected.length === 1 ? '' : 's'}
					</span>{' '}
					totalling{' '}
					<span className='font-semibold'>
						{totalUnits} credit unit
						{totalUnits === 1 ? '' : 's'}
					</span>
					.
				</p>

				<ul className='flex max-h-56 flex-col gap-2 overflow-y-auto'>
					{selected.map((course) => (
						<li
							key={course.offeringId}
							className='flex items-center justify-between gap-3 rounded-[10px] border border-border px-3 py-2'
						>
							<span className='flex min-w-0 flex-col'>
								<span className='text-xs font-semibold text-brand-red'>
									{course.code}
								</span>
								<span className='truncate text-sm'>
									{course.title}
								</span>
							</span>
							<span className='shrink-0 text-xs font-medium text-label'>
								{course.units} units
							</span>
						</li>
					))}
				</ul>

				<p className='rounded-[10px] bg-[#FFF7ED] px-4 py-3 text-xs text-[#9F0712]'>
					You can only register once per semester. Once submitted you
					will not be able to change this selection yourself — an
					administrator would have to reject it first.
				</p>

				<p className='text-xs text-label'>
					The semester load must be between {minUnits} and {maxUnits}{' '}
					credit units.
				</p>

				{error && (
					<p
						role='alert'
						className='rounded-[10px] bg-red-50 px-4 py-3 text-sm text-red-600'
					>
						{error}
					</p>
				)}

				<div className='flex justify-end gap-3'>
					<Button
						variant='tertiary'
						onClick={onClose}
						disabled={isSubmitting}
					>
						Go back
					</Button>
					<Button onClick={onConfirm} disabled={isSubmitting}>
						{isSubmitting ? 'Submitting…' : 'Submit registration'}
					</Button>
				</div>
			</div>
		</Modal>
	);
}
