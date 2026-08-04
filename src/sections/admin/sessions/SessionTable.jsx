import { Button } from '../../../components/ui/Button';
import EmptyState from '../../../components/ui/EmptyState';
import UserTableSkeleton from '../../../components/shared/UserTableSkeleton';

const SEMESTER_LABELS = { first: '1st', second: '2nd' };

function formatRange(start, end) {
	if (!start || !end) return 'Not set';

	const format = (value) =>
		new Date(value).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		});

	return `${format(start)} – ${format(end)}`;
}

export default function SessionTable({
	sessions,
	loading,
	error,
	onRetry,
	onEdit,
	onSetCurrent,
	settingCurrentId,
	onAdd,
}) {
	if (loading) return <UserTableSkeleton cols={6} />;

	if (error) {
		return (
			<EmptyState
				title='Failed to load academic sessions'
				description={error}
				action={<Button onClick={onRetry}>Retry</Button>}
			/>
		);
	}

	if (!sessions.length) {
		return (
			<EmptyState
				title='No academic sessions yet'
				description='Everything in the portal is scoped to a session — courses are offered in one, students register within one, and results belong to one.'
				action={<Button onClick={onAdd}>Add Session</Button>}
			/>
		);
	}

	return (
		<section aria-label='Academic sessions'>
			{/* Desktop */}
			<div className='hidden overflow-x-auto lg:block'>
				<table className='w-full text-sm'>
					<caption className='sr-only'>
						Academic sessions with their semester dates and status
					</caption>
					<thead className='bg-[#F9F9FF] text-left text-xs text-label'>
						<tr>
							<th className='px-3 py-3 font-medium'>Session</th>
							<th className='px-3 py-3 font-medium'>
								First semester
							</th>
							<th className='px-3 py-3 font-medium'>
								Second semester
							</th>
							<th className='px-3 py-3 font-medium'>Offerings</th>
							<th className='px-3 py-3 font-medium'>Status</th>
							<th className='px-3 py-3 font-medium'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{sessions.map((session) => (
							<tr
								key={session.id}
								className='border-b border-border last:border-0'
							>
								<td className='px-3 py-3 font-semibold'>
									{session.name}
								</td>
								<td className='px-3 py-3'>
									{formatRange(
										session.first_semester_start,
										session.first_semester_end,
									)}
								</td>
								<td className='px-3 py-3'>
									{formatRange(
										session.second_semester_start,
										session.second_semester_end,
									)}
								</td>
								<td className='px-3 py-3'>
									{session.course_offerings_count ?? 0}
								</td>
								<td className='px-3 py-3'>
									{session.is_current ? (
										<span className='flex flex-col gap-0.5'>
											<span className='w-fit rounded-[10px] bg-green-100 px-2.5 py-0.5 text-xs text-green-700'>
												Current
											</span>
											{/* Which half of the year the
											    portal is treating as "now",
											    derived server-side from the
											    dates in this row. */}
											<span className='text-xs text-label'>
												{SEMESTER_LABELS[
													session.current_semester
												] ?? ''}{' '}
												semester
											</span>
										</span>
									) : (
										<span className='rounded-[10px] bg-[#C9C9C9] px-2.5 py-0.5 text-xs text-[#2C2C2C]'>
											Past
										</span>
									)}
								</td>
								<td className='px-3 py-3'>
									<div className='flex gap-2'>
										<Button
											variant='secondary'
											onClick={() => onEdit(session)}
											aria-label={`Edit ${session.name}`}
										>
											Edit
										</Button>
										{!session.is_current && (
											<Button
												onClick={() =>
													onSetCurrent(session)
												}
												disabled={
													settingCurrentId ===
													session.id
												}
												aria-label={`Make ${session.name} the current session`}
											>
												{settingCurrentId === session.id
													? 'Switching…'
													: 'Set as current'}
											</Button>
										)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Mobile */}
			<ul className='flex flex-col gap-4 p-4 lg:hidden'>
				{sessions.map((session) => (
					<li
						key={session.id}
						className='flex flex-col gap-3 rounded-[10px] border border-border p-4'
					>
						<div className='flex items-start justify-between gap-3'>
							<span className='font-semibold'>
								{session.name}
							</span>
							{session.is_current ? (
								<span className='rounded-[10px] bg-green-100 px-2.5 py-0.5 text-xs text-green-700'>
									Current
								</span>
							) : (
								<span className='rounded-[10px] bg-[#C9C9C9] px-2.5 py-0.5 text-xs text-[#2C2C2C]'>
									Past
								</span>
							)}
						</div>

						<dl className='flex flex-col gap-2 text-xs'>
							<div>
								<dt className='text-label'>First semester</dt>
								<dd>
									{formatRange(
										session.first_semester_start,
										session.first_semester_end,
									)}
								</dd>
							</div>
							<div>
								<dt className='text-label'>Second semester</dt>
								<dd>
									{formatRange(
										session.second_semester_start,
										session.second_semester_end,
									)}
								</dd>
							</div>
							<div>
								<dt className='text-label'>Offerings</dt>
								<dd>{session.course_offerings_count ?? 0}</dd>
							</div>
						</dl>

						<div className='flex flex-wrap gap-2'>
							<Button
								variant='secondary'
								onClick={() => onEdit(session)}
								aria-label={`Edit ${session.name}`}
							>
								Edit
							</Button>
							{!session.is_current && (
								<Button
									onClick={() => onSetCurrent(session)}
									disabled={settingCurrentId === session.id}
									aria-label={`Make ${session.name} the current session`}
								>
									{settingCurrentId === session.id
										? 'Switching…'
										: 'Set as current'}
								</Button>
							)}
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
