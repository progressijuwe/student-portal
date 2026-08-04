import { Button } from '../../../components/ui/Button';
import EmptyState from '../../../components/ui/EmptyState';
import UserTableSkeleton from '../../../components/shared/UserTableSkeleton';
import { DAY_LABELS, toTimeInput } from '../../../constants/venues';

function StatusChip({ isActive }) {
	return (
		<span
			className={`rounded-[10px] px-2.5 py-0.5 text-xs ${
				isActive
					? 'bg-green-100 text-green-700'
					: 'bg-[#C9C9C9] text-[#2C2C2C]'
			}`}
		>
			{isActive ? 'Scheduled' : 'Cancelled'}
		</span>
	);
}

function VenueCell({ venue }) {
	if (!venue) return <span className='text-xs text-label'>—</span>;

	return (
		<span className='flex flex-col'>
			<span>{venue.name}</span>
			{venue.building && (
				<span className='text-xs text-label'>{venue.building}</span>
			)}
		</span>
	);
}

/**
 * Slots arrive already ordered by day then start time, so the rows are grouped
 * under a day heading rather than repeating the day in every row — a timetable
 * is read a day at a time.
 */
function groupByDay(slots) {
	const groups = new Map();

	for (const slot of slots) {
		if (!groups.has(slot.day)) groups.set(slot.day, []);
		groups.get(slot.day).push(slot);
	}

	return [...groups.entries()];
}

export default function TimetableTable({
	slots,
	loading,
	error,
	onRetry,
	onEdit,
	onAdd,
}) {
	if (loading) return <UserTableSkeleton cols={6} />;

	if (error) {
		return (
			<EmptyState
				title='Failed to load the timetable'
				description={error}
				action={<Button onClick={onRetry}>Retry</Button>}
			/>
		);
	}

	if (!slots.length) {
		return (
			<EmptyState
				title='Nothing scheduled'
				description='No classes match these filters. Add a slot to put a course in a room at a time.'
				action={<Button onClick={onAdd}>Add Class</Button>}
			/>
		);
	}

	const grouped = groupByDay(slots);

	return (
		<section aria-label='Timetable' className='flex flex-col'>
			{grouped.map(([day, daySlots]) => (
				<div key={day} className='flex flex-col'>
					<h3 className='bg-[#F9F9FF] px-4 py-2 text-xs font-semibold uppercase text-label'>
						{DAY_LABELS[day] ?? day}
					</h3>

					{/* Desktop */}
					<div className='hidden overflow-x-auto lg:block'>
						<table className='w-full text-sm'>
							<caption className='sr-only'>
								{DAY_LABELS[day] ?? day} classes
							</caption>
							<thead className='text-left text-xs text-label'>
								<tr>
									<th className='px-3 py-2 font-medium'>
										Time
									</th>
									<th className='px-3 py-2 font-medium'>
										Course
									</th>
									<th className='px-3 py-2 font-medium'>
										Lecturer
									</th>
									<th className='px-3 py-2 font-medium'>
										Venue
									</th>
									<th className='px-3 py-2 font-medium'>
										Status
									</th>
									<th className='px-3 py-2 font-medium'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{daySlots.map((slot) => (
									<tr
										key={slot.id}
										className='border-b border-border last:border-0'
									>
										<td className='px-3 py-3 font-medium whitespace-nowrap'>
											{toTimeInput(slot.start_time)} –{' '}
											{toTimeInput(slot.end_time)}
										</td>
										<td className='px-3 py-3'>
											<span className='flex flex-col'>
												<span className='font-semibold'>
													{
														slot.course_offering
															?.course?.code
													}
												</span>
												<span className='text-xs text-label'>
													{
														slot.course_offering
															?.course?.title
													}
												</span>
											</span>
										</td>
										<td className='px-3 py-3'>
											{slot.course_offering?.lecturer
												?.display_name ?? (
												<span className='text-xs font-medium text-brand-red'>
													Unassigned
												</span>
											)}
										</td>
										<td className='px-3 py-3'>
											<VenueCell venue={slot.venue} />
										</td>
										<td className='px-3 py-3'>
											<StatusChip
												isActive={slot.is_active}
											/>
										</td>
										<td className='px-3 py-3'>
											<Button
												variant='secondary'
												onClick={() => onEdit(slot)}
												aria-label={`Edit ${slot.course_offering?.course?.code} on ${DAY_LABELS[day] ?? day}`}
											>
												Edit
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Mobile */}
					<ul className='flex flex-col gap-4 p-4 lg:hidden'>
						{daySlots.map((slot) => (
							<li
								key={slot.id}
								className='flex flex-col gap-3 rounded-[10px] border border-border p-4'
							>
								<div className='flex items-start justify-between gap-3'>
									<span className='flex flex-col'>
										<span className='font-semibold'>
											{slot.course_offering?.course?.code}
										</span>
										<span className='text-xs text-label'>
											{
												slot.course_offering?.course
													?.title
											}
										</span>
									</span>
									<StatusChip isActive={slot.is_active} />
								</div>

								<dl className='grid grid-cols-2 gap-2 text-xs'>
									<div>
										<dt className='text-label'>Time</dt>
										<dd>
											{toTimeInput(slot.start_time)} –{' '}
											{toTimeInput(slot.end_time)}
										</dd>
									</div>
									<div>
										<dt className='text-label'>Venue</dt>
										<dd>
											<VenueCell venue={slot.venue} />
										</dd>
									</div>
									<div className='col-span-2'>
										<dt className='text-label'>Lecturer</dt>
										<dd>
											{slot.course_offering?.lecturer
												?.display_name ?? 'Unassigned'}
										</dd>
									</div>
								</dl>

								<Button
									variant='secondary'
									onClick={() => onEdit(slot)}
									aria-label={`Edit ${slot.course_offering?.course?.code} on ${DAY_LABELS[day] ?? day}`}
								>
									Edit
								</Button>
							</li>
						))}
					</ul>
				</div>
			))}
		</section>
	);
}
