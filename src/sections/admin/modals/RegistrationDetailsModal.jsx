import Modal from '../../../components/ui/Modal';

export default function RegistrationDetailsModal({ registration, onClose }) {
	if (!registration) return null;

	const totalUnits = registration.courses.reduce(
		(sum, c) => sum + c.units,
		0,
	);

	return (
		<Modal
			heading={registration.name}
			description={`${registration.id} · ${registration.level} Level · ${registration.department}`}
			onClose={onClose}
		>
			<div className='px-4 pb-4 flex flex-col gap-4'>
				<div className='flex items-center justify-between text-sm'>
					<span className='text-label font-medium'>
						{registration.courses.length} Courses Registered
					</span>
					<span className='text-label font-medium'>
						Total: {totalUnits} Units
					</span>
				</div>
				<div className='flex flex-col divide-y divide-border'>
					{registration.courses.map((course, index) => (
						<div
							key={course.code}
							className='flex items-center justify-between py-3'
						>
							<div className='flex items-center gap-3'>
								<span className='text-xs text-label w-5'>
									{index + 1}
								</span>
								<div className='flex flex-col gap-0.5'>
									<span className='text-sm font-semibold text-brand-red'>
										{course.code}
									</span>
									<span className='text-sm text-black'>
										{course.title}
									</span>
								</div>
							</div>
							<span className='text-xs text-label shrink-0'>
								{course.units} Units
							</span>
						</div>
					))}
				</div>
			</div>
		</Modal>
	);
}
