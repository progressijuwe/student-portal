import RegistrationRow from '../../../components/ui/RegistrationRow';
import RegistrationCard from '../../../components/ui/RegistrationCard';
import EmptyState from '../../../components/ui/EmptyState';
import UserTableSkeleton from '../../../components/shared/UserTableSkeleton';

export default function RegistrationTable({
	registrations,
	loading,
	isPending,
	onView,
	onApprove,
	onReject,
}) {
	if (loading) return <UserTableSkeleton cols={6} />;
	if (!registrations.length)
		return (
			<EmptyState
				title='No registrations found'
				description='No registrations match your current filters.'
			/>
		);

	return (
		<section aria-label='Course registrations'>
			{/* Desktop */}
			<div className='hidden lg:block overflow-x-auto'>
				<table className='w-full text-sm'>
					<caption className='sr-only'>
						Course registration list
					</caption>
					<thead className='bg-[#F9F9FF] text-left text-xs text-label'>
						<tr>
							<th className='py-3 px-3 font-medium'>S/N</th>
							<th className='py-3 px-3 font-medium'>
								Student Name
							</th>
							<th className='py-3 px-3 font-medium'>
								Matric Number
							</th>
							<th className='py-3 px-3 font-medium'>Level</th>
							<th className='py-3 px-3 font-medium'>
								Courses Registered
							</th>
							<th className='py-3 px-3 font-medium'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{registrations.map((reg, index) => (
							<RegistrationRow
								key={reg.id}
								index={index + 1}
								registration={reg}
								isPending={isPending}
								onView={onView}
								onApprove={onApprove}
								onReject={onReject}
							/>
						))}
					</tbody>
				</table>
			</div>

			{/* Mobile */}
			<div className='flex flex-col gap-4 p-4 lg:hidden'>
				{registrations.map((reg) => (
					<RegistrationCard
						key={reg.id}
						registration={reg}
						isPending={isPending}
						onView={onView}
						onApprove={onApprove}
						onReject={onReject}
					/>
				))}
			</div>
		</section>
	);
}
