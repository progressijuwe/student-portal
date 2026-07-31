import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useCourseRegistrationQuery } from '../../hooks/useCourseRegistrationQuery';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import {
	useAdminRegistrations,
	useReviewRegistrations,
} from '../../hooks/admin/useAdminRegistrations';
import { getErrorMessage } from '../../utils/getErrorMessage';
import RegistrationTabs from '../../sections/admin/registrations/RegistrationTabs';
import RegistrationToolbar from '../../sections/admin/registrations/RegistrationToolbar';
import RegistrationTable from '../../sections/admin/registrations/RegistrationTable';
import RegistrationDetailsModal from '../../sections/admin/modals/RegistrationDetailsModal';
import Pagination from '../../components/ui/Pagination';
import ErrorState from '../../components/ui/ErrorState';

/**
 * Tab label -> the enrollment status the API filters on. 'approved' is stored
 * as 'active': a registration that has been approved is simply an active
 * enrollment.
 */
const TAB_STATUS = {
	pending: 'pending',
	approved: 'active',
	rejected: 'rejected',
};

export default function AdminCourseRegistrationsPage() {
	const { search, page, filters, setSearch, setFilters, setPage } =
		useCourseRegistrationQuery();

	const [activeTab, setActiveTab] = useState('pending');
	const [selected, setSelected] = useState(null);

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
		useAdminRegistrations(params);
	const review = useReviewRegistrations();

	const registrations = data?.data ?? [];
	const meta = data?.meta ?? {};
	const counts = meta.counts ?? { pending: 0, approved: 0, rejected: 0 };

	const handleTabChange = useCallback(
		(tab) => {
			setActiveTab(tab);
			setPage(1);
		},
		[setPage],
	);

	// Approving sends every enrollment id in the student's submission, so the
	// whole registration commits or none of it does.
	const handleReview = useCallback(
		(registration, action) =>
			review.mutate({
				enrollmentIds: registration.enrollment_ids,
				action,
			}),
		[review],
	);

	if (isError) {
		return (
			<div className='flex flex-col gap-5 px-5 py-8 lg:px-8 lg:py-6'>
				<h2 className='text-xl font-semibold lg:text-[30px]'>
					Course Registration Management
				</h2>
				<ErrorState
					title='Failed to load registrations'
					description={getErrorMessage(error)}
					onRetry={refetch}
				/>
			</div>
		);
	}

	return (
		<div className='flex flex-col gap-5 px-5 py-8 lg:px-8 lg:py-6'>
			<h2 className='text-xl font-semibold lg:text-[30px]'>
				Course Registration Management
			</h2>

			<div className='flex w-full flex-col gap-4 rounded-[10px] border border-border bg-white lg:gap-3 lg:border-0 lg:bg-transparent'>
				<RegistrationTabs
					activeTab={activeTab}
					counts={counts}
					onTabChange={handleTabChange}
				/>

				<RegistrationToolbar
					search={search}
					onSearch={setSearch}
					filters={filters}
					onFilterChange={setFilters}
				/>

				{review.isError && (
					<p role='alert' className='px-4 text-sm text-red-600'>
						{getErrorMessage(review.error)}
					</p>
				)}

				<RegistrationTable
					registrations={registrations}
					loading={isPending || review.isPending}
					isPending={activeTab === 'pending'}
					onView={setSelected}
					onApprove={(registration) =>
						handleReview(registration, 'approve')
					}
					onReject={(registration) =>
						handleReview(registration, 'reject')
					}
				/>

				{!isPending && meta.last_page > 1 && (
					<Pagination
						page={meta.current_page}
						total={meta.total}
						perPage={meta.per_page}
						onPageChange={setPage}
						label={`${activeTab} approval`}
					/>
				)}

				<AnimatePresence>
					{selected && (
						<RegistrationDetailsModal
							registration={selected}
							onClose={() => setSelected(null)}
						/>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
