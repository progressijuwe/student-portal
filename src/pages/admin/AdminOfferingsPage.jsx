import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useOfferingQuery } from '../../hooks/useOfferingQuery';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { useAdminOfferings } from '../../hooks/admin/useAdminOfferings';
import { useModal } from '../../hooks/useModal';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { Button } from '../../components/ui/Button';
import EntityPageShell from '../../components/ui/EntityPageShell';
import Pagination from '../../components/ui/Pagination';
import OfferingTable from '../../sections/admin/offerings/OfferingTable';
import OfferingToolbar from '../../sections/admin/offerings/OfferingToolbar';
import AddOfferingModal from '../../sections/admin/modals/AddOfferingModal';
import EditOfferingModal from '../../sections/admin/modals/EditOfferingModal';
import AddSuccessModal from '../../sections/admin/modals/AddSuccessModal';

const MODAL = {
	ADD: 'add',
	ADD_SUCCESS: 'add-success',
	EDIT: 'edit',
	EDIT_SUCCESS: 'edit-success',
};

/**
 * Course offerings — the link between the course catalogue and everything that
 * happens in a given semester.
 *
 * Creating a course only adds a catalogue entry. Until it is offered in a
 * session and semester there is nothing for a student to register for, nothing
 * for a lecturer to be assigned to, and nothing for a timetable slot to attach
 * to, so a school with no offerings has an inert portal.
 */
export default function AdminOfferingsPage() {
	const { search, filters, page, setSearch, setFilters, setPage } =
		useOfferingQuery();
	const { modal, open, close } = useModal();

	const debouncedSearch = useDebouncedValue(search);

	const params = useMemo(
		() => ({
			page,
			search: debouncedSearch || undefined,
			session_id: filters.session_id || undefined,
			semester: filters.semester || undefined,
			faculty_id: filters.faculty_id || undefined,
			department_id: filters.department_id || undefined,
			lecturer_id: filters.lecturer_id || undefined,
			is_active: filters.is_active || undefined,
		}),
		[page, debouncedSearch, filters],
	);

	const { data, isPending, isError, error, refetch } =
		useAdminOfferings(params);

	const offerings = data?.data ?? [];
	const meta = data?.meta ?? {};

	const handleSuccess = (type) => {
		open(type);
		setTimeout(close, 2000);
	};

	return (
		<EntityPageShell title='Course Offerings'>
			<div className='flex flex-col gap-3 px-4 pt-4 lg:flex-row lg:items-center lg:justify-between'>
				<p className='text-sm text-label'>
					A course has to be offered in a session and semester before
					students can register for it.
				</p>
				<Button onClick={() => open(MODAL.ADD)}>
					Add Course Offering
				</Button>
			</div>

			<OfferingToolbar
				search={search}
				onSearch={setSearch}
				filters={filters}
				onFilterChange={setFilters}
			/>

			<OfferingTable
				offerings={offerings}
				loading={isPending}
				error={isError ? getErrorMessage(error) : null}
				onRetry={refetch}
				onEdit={(offering) => open(MODAL.EDIT, offering)}
				onAdd={() => open(MODAL.ADD)}
			/>

			{!isError && !isPending && meta.last_page > 1 && (
				<Pagination
					page={meta.current_page}
					total={meta.total}
					perPage={meta.per_page}
					onPageChange={setPage}
				/>
			)}

			<AnimatePresence>
				{modal.type === MODAL.ADD && (
					<AddOfferingModal
						onClose={close}
						onSuccess={() => handleSuccess(MODAL.ADD_SUCCESS)}
					/>
				)}
				{modal.type === MODAL.ADD_SUCCESS && (
					<AddSuccessModal
						onClose={close}
						text='Course Offering Created Successfully'
					/>
				)}
				{modal.type === MODAL.EDIT && (
					<EditOfferingModal
						offering={modal.data}
						onClose={close}
						onSuccess={() => handleSuccess(MODAL.EDIT_SUCCESS)}
					/>
				)}
				{modal.type === MODAL.EDIT_SUCCESS && (
					<AddSuccessModal
						onClose={close}
						text='Course Offering Updated Successfully'
					/>
				)}
			</AnimatePresence>
		</EntityPageShell>
	);
}
