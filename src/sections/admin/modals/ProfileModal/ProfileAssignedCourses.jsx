import { useSelectedSession } from '../../../../hooks/useSelectedSession';
import { useAdminLecturerCourses } from '../../../../hooks/admin/useAdminLecturerCourses';
import { Button } from '../../../../components/ui/Button';

export default function ProfileAssignedCourses({ user, onViewResults }) {
	const { sessions, sessionId, setSessionId } = useSelectedSession();

	const { data, isLoading } = useAdminLecturerCourses(user?.rawId, {
		sessionId,
	});

	const courses = data?.courses ?? [];

	return (
		<div className='flex flex-col gap-6 px-4'>
			<div className='flex flex-col gap-2 lg:max-w-67.5 w-full'>
				<label
					htmlFor='lecturer-session-select'
					className='text-xs font-medium text-dark'
				>
					Academic Session
				</label>
				<select
					id='lecturer-session-select'
					value={sessionId ?? ''}
					onChange={(e) => setSessionId(e.target.value)}
					className='bg-white border border-brand-orange rounded-[10px] p-2.5 text-xs text-black'
				>
					{sessions.map((session) => (
						<option key={session.id} value={session.id}>
							{session.name}
						</option>
					))}
				</select>
			</div>

			<div className='flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50/60 p-3 sm:p-4'>
				{isLoading ? (
					<p className='py-6 text-center text-sm text-gray-500'>
						Loading...
					</p>
				) : courses.length === 0 ? (
					<p className='py-6 text-center text-sm text-gray-500'>
						No courses assigned for this session.
					</p>
				) : (
					courses.map((entry) => (
						<div
							key={entry.offering.id}
							className='flex flex-col gap-3 rounded-[5px] border border-border bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-7 sm:py-2'
						>
							<div className='flex flex-col min-w-0'>
								<p className='text-sm font-semibold'>
									<span className='text-brand-orange'>
										{entry.offering.course.code}
									</span>
									<span className='mx-1 text-brand-blue-border'>
										|
									</span>
									<span className='text-brand-blue-border'>
										{entry.offering.course.credit_units}{' '}
										Units
									</span>
									<span className='mx-1 text-label'>|</span>
									<span className='text-label'>
										{entry.enrolled_count} students
									</span>
								</p>
								<p className='text-base font-medium text-black wrap-break-word'>
									{entry.offering.course.title}
								</p>
							</div>

							<Button
								variant='primary'
								onClick={() => onViewResults?.(entry.offering)}
								className='w-full sm:w-fit'
							>
								View Results
							</Button>
						</div>
					))
				)}
			</div>
		</div>
	);
}
