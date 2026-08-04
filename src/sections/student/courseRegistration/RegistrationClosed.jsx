import { Button } from '../../../components/ui/Button';

const COPY = {
	pending: {
		tone: 'bg-[#FFF7ED] text-[#9F0712] border-brand-orange',
		title: 'You have already registered for this semester',
		body: 'Your registration has been submitted and is waiting for your department to review it. You cannot register again while it is pending.',
	},
	approved: {
		tone: 'bg-green-50 text-green-800 border-green-300',
		title: 'Your registration for this semester is approved',
		body: 'Your courses are confirmed. Registration for this semester is closed for you.',
	},
};

/**
 * Shown in place of the course picker once a student has registered.
 *
 * Registration is once per semester, so the honest thing is to say so before
 * they choose anything. Previously the page let them build a whole basket and
 * then failed on submit with a message about exceeding the credit maximum —
 * which described the arithmetic rather than the rule, and only after the work
 * had been done.
 *
 * A rejected registration never reaches this component: nothing is occupying a
 * seat, so the student can and should register again.
 */
export default function RegistrationClosed({
	registration,
	onViewRegistrations,
}) {
	const copy = COPY[registration.status] ?? COPY.pending;

	return (
		<div
			className={`flex flex-col gap-4 rounded-[10px] border p-6 ${copy.tone}`}
		>
			<div className='flex flex-col gap-2'>
				<h2 className='text-base font-semibold'>{copy.title}</h2>
				<p className='text-sm'>{copy.body}</p>
			</div>

			<dl className='flex flex-wrap gap-x-8 gap-y-2 text-sm'>
				<div>
					<dt className='text-xs opacity-80'>Courses registered</dt>
					<dd className='font-semibold'>
						{registration.course_count}
					</dd>
				</div>
				<div>
					<dt className='text-xs opacity-80'>Credit units</dt>
					<dd className='font-semibold'>
						{registration.total_credit_units}
					</dd>
				</div>
				{registration.submitted_at && (
					<div>
						<dt className='text-xs opacity-80'>Submitted</dt>
						<dd className='font-semibold'>
							{new Date(
								registration.submitted_at,
							).toLocaleDateString('en-GB', {
								day: 'numeric',
								month: 'short',
								year: 'numeric',
							})}
						</dd>
					</div>
				)}
			</dl>

			<div>
				<Button onClick={onViewRegistrations}>
					View my registrations
				</Button>
			</div>

			<p className='text-xs opacity-80'>
				Need a change? Contact your department — an administrator can
				reject the registration, which reopens it for you.
			</p>
		</div>
	);
}
