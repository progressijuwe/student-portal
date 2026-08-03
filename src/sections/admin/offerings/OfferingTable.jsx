import { Button } from '../../../components/ui/Button';
import EmptyState from '../../../components/ui/EmptyState';
import UserTableSkeleton from '../../../components/shared/UserTableSkeleton';

const SEMESTER_LABELS = {
	first: '1st Semester',
	second: '2nd Semester',
};

function StatusChip({ isActive }) {
	return (
		<span
			className={`rounded-[10px] px-2.5 py-0.5 text-xs ${
				isActive
					? 'bg-green-100 text-green-700'
					: 'bg-[#C9C9C9] text-[#2C2C2C]'
			}`}
		>
			{isActive ? 'Open' : 'Closed'}
		</span>
	);
}

/**
 * An offering with nobody teaching it is not a cosmetic gap — no marks can be
 * entered against it — so it is called out rather than left as an empty cell.
 */
function LecturerCell({ lecturer }) {
	if (!lecturer) {
		return (
			<span className='text-xs font-medium text-brand-red'>
				Unassigned
			</span>
		);
	}

	return (
		<span className='flex flex-col'>
			<span>{lecturer.display_name ?? lecturer.name}</span>
			{lecturer.staff_id && (
				<span className='text-xs text-label'>{lecturer.staff_id}</span>
			)}
		</span>
	);
}

export default function OfferingTable({
	offerings,
	loading,
	error,
	onRetry,
	onEdit,
	onAdd,
}) {
	if (loading) return <UserTableSkeleton cols={7} />;

	if (error) {
		return (
			<EmptyState
				title='Failed to load course offerings'
				description={error}
				action={<Button onClick={onRetry}>Retry</Button>}
			/>
		);
	}

	if (!offerings.length) {
		return (
			<EmptyState
				title='No course offerings yet'
				description='A course has to be offered in a session and semester before students can register for it or a lecturer can enter marks.'
				action={<Button onClick={onAdd}>Add Course Offering</Button>}
			/>
		);
	}

	return (
		<section aria-label='Course offerings list'>
			{/* Desktop */}
			<div className='hidden overflow-x-auto lg:block'>
				<table className='w-full text-sm'>
					<caption className='sr-only'>
						Course offerings with their session, lecturer and
						registration status
					</caption>
					<thead className='bg-[#F9F9FF] text-left text-xs text-label'>
						<tr>
							<th className='px-3 py-3 font-medium'>S/N</th>
							<th className='px-3 py-3 font-medium'>Course</th>
							<th className='px-3 py-3 font-medium'>Session</th>
							<th className='px-3 py-3 font-medium'>Semester</th>
							<th className='px-3 py-3 font-medium'>Lecturer</th>
							<th className='px-3 py-3 font-medium'>Students</th>
							<th className='px-3 py-3 font-medium'>Status</th>
							<th className='px-3 py-3 font-medium'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{offerings.map((offering, index) => (
							<tr
								key={offering.id}
								className='border-b border-border last:border-0'
							>
								<td className='px-3 py-3'>{index + 1}</td>
								<td className='px-3 py-3'>
									<span className='flex flex-col'>
										<span className='font-semibold'>
											{offering.course?.code}
										</span>
										<span className='text-xs text-label'>
											{offering.course?.title}
										</span>
									</span>
								</td>
								<td className='px-3 py-3'>
									{offering.session?.name ?? '—'}
								</td>
								<td className='px-3 py-3'>
									{SEMESTER_LABELS[offering.semester] ??
										offering.semester}
								</td>
								<td className='px-3 py-3'>
									<LecturerCell
										lecturer={offering.lecturer}
									/>
								</td>
								<td className='px-3 py-3'>
									{offering.enrolled_count ?? 0}
								</td>
								<td className='px-3 py-3'>
									<StatusChip isActive={offering.is_active} />
								</td>
								<td className='px-3 py-3'>
									<Button
										variant='secondary'
										onClick={() => onEdit(offering)}
										aria-label={`Edit ${offering.course?.code} offering`}
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
				{offerings.map((offering) => (
					<li
						key={offering.id}
						className='flex flex-col gap-3 rounded-[10px] border border-border p-4'
					>
						<div className='flex items-start justify-between gap-3'>
							<span className='flex flex-col'>
								<span className='font-semibold'>
									{offering.course?.code}
								</span>
								<span className='text-xs text-label'>
									{offering.course?.title}
								</span>
							</span>
							<StatusChip isActive={offering.is_active} />
						</div>

						<dl className='grid grid-cols-2 gap-2 text-xs'>
							<div>
								<dt className='text-label'>Session</dt>
								<dd>{offering.session?.name ?? '—'}</dd>
							</div>
							<div>
								<dt className='text-label'>Semester</dt>
								<dd>
									{SEMESTER_LABELS[offering.semester] ??
										offering.semester}
								</dd>
							</div>
							<div>
								<dt className='text-label'>Lecturer</dt>
								<dd>
									<LecturerCell
										lecturer={offering.lecturer}
									/>
								</dd>
							</div>
							<div>
								<dt className='text-label'>Students</dt>
								<dd>{offering.enrolled_count ?? 0}</dd>
							</div>
						</dl>

						<Button
							variant='secondary'
							onClick={() => onEdit(offering)}
							aria-label={`Edit ${offering.course?.code} offering`}
						>
							Edit
						</Button>
					</li>
				))}
			</ul>
		</section>
	);
}
