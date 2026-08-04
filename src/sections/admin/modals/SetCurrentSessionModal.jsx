import Modal from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';

/**
 * Confirms the rollover to a new academic session.
 *
 * This is the widest-reaching switch in the admin area: everything from a
 * student's dashboard to a lecturer's mark sheet resolves the current session
 * before it resolves anything else, so the whole portal moves at once. The
 * dialog names what changes rather than asking a bare "are you sure?", and says
 * the one reassuring thing that is actually true — nothing is deleted, and
 * switching back is the same two clicks.
 */
export default function SetCurrentSessionModal({
	session,
	currentName,
	isSubmitting,
	error,
	onConfirm,
	onClose,
}) {
	return (
		<Modal
			heading='Switch academic session?'
			description={`${currentName ?? 'The current session'} → ${session?.name}`}
			onClose={onClose}
		>
			<div className='flex flex-col gap-5 px-4 pb-4'>
				<div className='flex flex-col gap-2 text-sm'>
					<p>
						Everyone using the portal will move to{' '}
						<span className='font-semibold'>{session?.name}</span>{' '}
						immediately. That means:
					</p>
					<ul className='list-disc pl-5 text-label'>
						<li>
							Students see that session&apos;s courses,
							registration window and results
						</li>
						<li>
							Lecturers see the classes they teach in it, and
							their mark sheets follow
						</li>
						<li>
							Dashboards, timetables and the approval queues all
							re-scope to it
						</li>
					</ul>
					<p className='text-label'>
						Nothing is deleted. Past sessions keep their enrolments,
						grades and transcripts, and you can switch back at any
						time.
					</p>
				</div>

				{session?.course_offerings_count === 0 && (
					<p
						role='alert'
						className='rounded-[10px] bg-[#FFF7ED] px-4 py-3 text-sm text-[#9F0712]'
					>
						<span className='font-semibold'>
							This session has no course offerings yet.
						</span>{' '}
						Until courses are offered in it, students will have
						nothing to register for and lecturers will see no
						classes.
					</p>
				)}

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
						Cancel
					</Button>
					<Button onClick={onConfirm} disabled={isSubmitting}>
						{isSubmitting
							? 'Switching…'
							: `Switch to ${session?.name}`}
					</Button>
				</div>
			</div>
		</Modal>
	);
}
