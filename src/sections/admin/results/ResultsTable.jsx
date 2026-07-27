import ResultRow from "../../../components/ui/ResultRow";
import ResultCard from "../../../components/ui/ResultCard";
import EmptyState from "../../../components/ui/EmptyState";
import UserTableSkeleton from "../../../components/shared/UserTableSkeleton";

export default function ResultsTable({
	results,
	loading,
	isPending,
	onView,
	onApprove,
	onReject,
}) {
	if (loading) return <UserTableSkeleton cols={6} />;
	if (!results.length)
		return (
			<EmptyState
				title='No results found'
				description='No results match your current filters.'
			/>
		);

	return (
		<section aria-label='Results list'>
			{/* Desktop */}
			<div className='hidden lg:block overflow-x-auto'>
				<table className='w-full text-sm'>
					<caption className='sr-only'>Results approval list</caption>
					<thead className='bg-[#F9F9FF] text-left text-xs text-label'>
						<tr>
							<th className='py-3 px-3 font-medium'>S/N</th>
							<th className='py-3 px-3 font-medium'>Course Details</th>
							<th className='py-3 px-3 font-medium'>Lecturer</th>
							<th className='py-3 px-3 font-medium'>Students</th>
							<th className='py-3 px-3 font-medium'>Avg Score</th>
							<th className='py-3 px-3 font-medium'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{results.map((result, index) => (
							<ResultRow
								key={result.id}
								index={index + 1}
								result={result}
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
				{results.map((result) => (
					<ResultCard
						key={result.id}
						result={result}
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
