import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useResultsQuery } from '../../hooks/useResultsQuery';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import {
	useAdminResults,
	useReviewResults,
} from '../../hooks/admin/useAdminResults';
import { getErrorMessage } from '../../utils/getErrorMessage';
import ResultsTabs from '../../sections/admin/results/ResultsTabs';
import ResultsToolbar from '../../sections/admin/results/ResultsToolbar';
import ResultsTable from '../../sections/admin/results/ResultsTable';
import ResultDetailsModal from '../../sections/admin/modals/ResultDetailsModal';
import RejectReasonModal from '../../sections/admin/modals/RejectReasonModal';
import Pagination from '../../components/ui/Pagination';
import EntityPageShell from '../../components/ui/EntityPageShell';
import ErrorState from '../../components/ui/ErrorState';

const TAB_STATUS = {
	pending: 'pending',
	approved: 'approved',
	rejected: 'rejected',
};

export default function AdminResultsPage() {
	const { search, page, filters, setSearch, setFilters, setPage } =
		useResultsQuery();

	const [activeTab, setActiveTab] = useState('pending');
	const [viewing, setViewing] = useState(null);
	const [rejecting, setRejecting] = useState(null);

	const debouncedSearch = useDebouncedValue(search);

	const params = useMemo(
		() => ({
			status: TAB_STATUS[activeTab],
			page,
			search: debouncedSearch || undefined,
			level: filters.level || undefined,
			faculty_id: filters.faculty_id || undefined,
			department_id: filters.department_id || undefined,
		}),
		[activeTab, page, debouncedSearch, filters],
	);

	const { data, isPending, isError, error, refetch } =
		useAdminResults(params);
	const review = useReviewResults();

	const results = data?.data ?? [];
	const meta = data?.meta ?? {};
	const counts = meta.counts ?? { pending: 0, approved: 0, rejected: 0 };

	const handleTabChange = useCallback(
		(tab) => {
			setActiveTab(tab);
			setPage(1);
		},
		[setPage],
	);

	// Approving a row approves every grade in that course's mark sheet at once.
	const handleApprove = useCallback(
		(result) =>
			review.mutate({ gradeIds: result.grade_ids, action: 'approve' }),
		[review],
	);

	// Rejection needs a reason — the API requires it and the lecturer sees it.
	const handleReject = useCallback(
		(rejectionReason) =>
			review.mutate(
				{
					gradeIds: rejecting.grade_ids,
					action: 'reject',
					rejectionReason,
				},
				{ onSuccess: () => setRejecting(null) },
			),
		[review, rejecting],
	);

	if (isError) {
		return (
			<EntityPageShell title='Results Management'>
				<ErrorState
					title='Failed to load results'
					description={getErrorMessage(error)}
					onRetry={refetch}
				/>
			</EntityPageShell>
		);
	}

	return (
		<EntityPageShell title='Results Management'>
			<ResultsTabs
				activeTab={activeTab}
				counts={counts}
				onTabChange={handleTabChange}
			/>

			<ResultsToolbar
				search={search}
				onSearch={setSearch}
				filters={filters}
				onFilterChange={setFilters}
			/>

			{review.isError && !rejecting && (
				<p role='alert' className='px-4 text-sm text-red-600'>
					{getErrorMessage(review.error)}
				</p>
			)}

			<ResultsTable
				results={results}
				loading={isPending || review.isPending}
				isPending={activeTab === 'pending'}
				onView={setViewing}
				onApprove={handleApprove}
				onReject={setRejecting}
			/>

			{!isPending && meta.last_page > 1 && (
				<Pagination
					page={meta.current_page}
					total={meta.total}
					perPage={meta.per_page}
					onPageChange={setPage}
				/>
			)}

			<AnimatePresence>
				{viewing && (
					<ResultDetailsModal
						offering={viewing}
						status={TAB_STATUS[activeTab]}
						onClose={() => setViewing(null)}
					/>
				)}

				{rejecting && (
					<RejectReasonModal
						title={`Reject ${rejecting.code} results`}
						description={`${rejecting.students} student result(s) will be returned to ${rejecting.lecturer} for correction.`}
						isSubmitting={review.isPending}
						error={
							review.isError
								? getErrorMessage(review.error)
								: null
						}
						onConfirm={handleReject}
						onClose={() => setRejecting(null)}
					/>
				)}
			</AnimatePresence>
		</EntityPageShell>
	);
}
