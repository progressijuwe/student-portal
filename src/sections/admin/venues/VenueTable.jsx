import { Button } from '../../../components/ui/Button';
import EmptyState from '../../../components/ui/EmptyState';
import UserTableSkeleton from '../../../components/shared/UserTableSkeleton';
import { VENUE_TYPE_LABELS } from '../../../constants/venues';

function StatusChip({ isActive }) {
	return (
		<span
			className={`rounded-[10px] px-2.5 py-0.5 text-xs ${
				isActive
					? 'bg-green-100 text-green-700'
					: 'bg-[#C9C9C9] text-[#2C2C2C]'
			}`}
		>
			{isActive ? 'In use' : 'Out of use'}
		</span>
	);
}

export default function VenueTable({
	venues,
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
				title='Failed to load venues'
				description={error}
				action={<Button onClick={onRetry}>Retry</Button>}
			/>
		);
	}

	if (!venues.length) {
		return (
			<EmptyState
				title='No venues yet'
				description='Classes are scheduled into venues, so at least one room has to exist before a timetable can be built.'
				action={<Button onClick={onAdd}>Add Venue</Button>}
			/>
		);
	}

	return (
		<section aria-label='Venues list'>
			{/* Desktop */}
			<div className='hidden overflow-x-auto lg:block'>
				<table className='w-full text-sm'>
					<caption className='sr-only'>
						Venues with their building, type, capacity and status
					</caption>
					<thead className='bg-[#F9F9FF] text-left text-xs text-label'>
						<tr>
							<th className='px-3 py-3 font-medium'>Code</th>
							<th className='px-3 py-3 font-medium'>Name</th>
							<th className='px-3 py-3 font-medium'>Building</th>
							<th className='px-3 py-3 font-medium'>Type</th>
							<th className='px-3 py-3 font-medium'>Capacity</th>
							<th className='px-3 py-3 font-medium'>Status</th>
							<th className='px-3 py-3 font-medium'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{venues.map((venue) => (
							<tr
								key={venue.id}
								className='border-b border-border last:border-0'
							>
								<td className='px-3 py-3 font-semibold'>
									{venue.code}
								</td>
								<td className='px-3 py-3'>{venue.name}</td>
								<td className='px-3 py-3'>
									{venue.building || (
										<span className='text-xs text-label'>
											Not set
										</span>
									)}
								</td>
								<td className='px-3 py-3'>
									{VENUE_TYPE_LABELS[venue.type] ??
										venue.type}
								</td>
								<td className='px-3 py-3'>{venue.capacity}</td>
								<td className='px-3 py-3'>
									<StatusChip isActive={venue.is_active} />
								</td>
								<td className='px-3 py-3'>
									<Button
										variant='secondary'
										onClick={() => onEdit(venue)}
										aria-label={`Edit ${venue.code}`}
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
				{venues.map((venue) => (
					<li
						key={venue.id}
						className='flex flex-col gap-3 rounded-[10px] border border-border p-4'
					>
						<div className='flex items-start justify-between gap-3'>
							<span className='flex flex-col'>
								<span className='font-semibold'>
									{venue.code}
								</span>
								<span className='text-xs text-label'>
									{venue.name}
								</span>
							</span>
							<StatusChip isActive={venue.is_active} />
						</div>

						<dl className='grid grid-cols-2 gap-2 text-xs'>
							<div>
								<dt className='text-label'>Building</dt>
								<dd>{venue.building || 'Not set'}</dd>
							</div>
							<div>
								<dt className='text-label'>Type</dt>
								<dd>
									{VENUE_TYPE_LABELS[venue.type] ??
										venue.type}
								</dd>
							</div>
							<div>
								<dt className='text-label'>Capacity</dt>
								<dd>{venue.capacity}</dd>
							</div>
						</dl>

						<Button
							variant='secondary'
							onClick={() => onEdit(venue)}
							aria-label={`Edit ${venue.code}`}
						>
							Edit
						</Button>
					</li>
				))}
			</ul>
		</section>
	);
}
