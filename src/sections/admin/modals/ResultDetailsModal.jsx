import Modal from '../../../components/ui/Modal';
import EmptyState from '../../../components/ui/EmptyState';
import ErrorState from '../../../components/ui/ErrorState';
import { useResultDetail } from '../../../hooks/admin/useAdminResults';
import { getErrorMessage } from '../../../utils/getErrorMessage';

/**
 * Per-student breakdown for one course offering, so an admin can see the actual
 * marks before approving a mark sheet rather than only the class average.
 */
export default function ResultDetailsModal({ offering, status, onClose }) {
	const { data, isPending, isError, error, refetch } = useResultDetail(
		offering.id,
		{ status },
	);

	const grades = data ?? [];

	return (
		<Modal
			onClose={onClose}
			heading={offering.code}
			description={`${offering.title} — ${offering.lecturer}`}
		>
			{isPending ? (
				<div className='flex flex-col gap-3 p-4' role='status'>
					<span className='sr-only'>Loading results…</span>
					{[0, 1, 2, 3, 4].map((row) => (
						<div
							key={row}
							className='h-10 w-full animate-pulse rounded-lg bg-brand'
						/>
					))}
				</div>
			) : isError ? (
				<ErrorState
					title='Failed to load results'
					description={getErrorMessage(error)}
					onRetry={refetch}
				/>
			) : grades.length === 0 ? (
				<EmptyState
					title='No results submitted'
					description='This course has no marks in this state.'
				/>
			) : (
				<div className='overflow-x-auto'>
					<table className='w-full text-sm'>
						<caption className='sr-only'>
							Student marks for {offering.code}
						</caption>
						<thead className='bg-[#F9F9FF] text-left text-xs text-label'>
							<tr>
								<th
									scope='col'
									className='px-3 py-3 font-medium'
								>
									Student
								</th>
								<th
									scope='col'
									className='px-3 py-3 font-medium'
								>
									Matric No.
								</th>
								<th
									scope='col'
									className='px-3 py-3 font-medium'
								>
									CA
								</th>
								<th
									scope='col'
									className='px-3 py-3 font-medium'
								>
									Project
								</th>
								<th
									scope='col'
									className='px-3 py-3 font-medium'
								>
									Exam
								</th>
								<th
									scope='col'
									className='px-3 py-3 font-medium'
								>
									Total
								</th>
								<th
									scope='col'
									className='px-3 py-3 font-medium'
								>
									Grade
								</th>
							</tr>
						</thead>
						<tbody>
							{grades.map((grade) => (
								<tr
									key={grade.id}
									className='border-t border-border'
								>
									<td className='px-3 py-3'>
										{grade.enrollment?.student?.name ?? '—'}
									</td>
									<td className='px-3 py-3 text-label'>
										{grade.enrollment?.student
											?.student_id ?? '—'}
									</td>
									<td className='px-3 py-3'>
										{grade.ca_score ?? '—'}
									</td>
									<td className='px-3 py-3'>
										{grade.project_score ?? '—'}
									</td>
									<td className='px-3 py-3'>
										{grade.exam_score ?? '—'}
									</td>
									<td className='px-3 py-3 font-semibold'>
										{grade.score ?? '—'}
									</td>
									<td className='px-3 py-3 font-semibold text-brand-red'>
										{grade.letter_grade ?? '—'}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</Modal>
	);
}
