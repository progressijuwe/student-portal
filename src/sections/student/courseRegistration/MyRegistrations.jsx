const STATUS_STYLES = {
	pending: 'bg-yellow-100 text-yellow-700',
	active: 'bg-green-100 text-green-700',
	rejected: 'bg-red-100 text-red-600',
	dropped: 'bg-gray-100 text-gray-600',
	completed: 'bg-blue-100 text-blue-600',
};

const STATUS_LABELS = {
	pending: 'Pending Approval',
	active: 'Approved',
	rejected: 'Rejected',
	dropped: 'Dropped',
	completed: 'Completed',
};

export default function MyRegistrations({ enrollments, isLoading, isError }) {
	if (isLoading) {
		return (
			<p className='text-sm text-label py-10 text-center'>
				Loading your registrations...
			</p>
		);
	}

	if (isError) {
		return (
			<p className='text-sm text-red-500 py-10 text-center'>
				Couldn't load your registrations.
			</p>
		);
	}

	if (!enrollments || enrollments.length === 0) {
		return (
			<p className='text-sm text-label py-10 text-center'>
				You haven't registered for any courses this semester.
			</p>
		);
	}

	const totalUnits = enrollments
		.filter((e) => e.status === 'active' || e.status === 'pending')
		.reduce(
			(sum, e) => sum + (e.course_offering?.course?.credit_units ?? 0),
			0,
		);

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col gap-3'>
				{enrollments.map((enrollment) => {
					const course = enrollment.course_offering?.course;
					return (
						<div
							key={enrollment.id}
							className='flex items-center justify-between gap-3 border border-border rounded-[10px] p-4 bg-white'
						>
							<div className='flex flex-col gap-1 min-w-0'>
								<div className='flex items-center gap-2 flex-wrap'>
									<span className='text-xs font-semibold text-brand-red'>
										{course?.code}
									</span>
									<span className='text-xs font-medium text-label'>
										{course?.credit_units} Units
									</span>
								</div>
								<p className='text-sm font-medium text-black truncate'>
									{course?.title}
								</p>
							</div>
							<span
								className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${STATUS_STYLES[enrollment.status] ?? 'bg-gray-100 text-gray-600'}`}
							>
								{STATUS_LABELS[enrollment.status] ??
									enrollment.status}
							</span>
						</div>
					);
				})}
			</div>
			<div className='text-xs font-medium text-label border-t border-border pt-3'>
				Total units (pending + approved):{' '}
				<span className='text-brand-red text-sm font-semibold'>
					{totalUnits}
				</span>
			</div>
		</div>
	);
}
