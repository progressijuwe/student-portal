import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useVenueQuery } from '../../hooks/useVenueQuery';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { useAdminVenues } from '../../hooks/admin/useAdminVenues';
import { useModal } from '../../hooks/useModal';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { VENUE_TYPES } from '../../constants/venues';
import { Button } from '../../components/ui/Button';
import EntityPageShell from '../../components/ui/EntityPageShell';
import Pagination from '../../components/ui/Pagination';
import SearchInput from '../../components/ui/SearchInput';
import { FilterSelect } from '../../sections/admin/shared/AdminFilterBar';
import VenueTable from '../../sections/admin/venues/VenueTable';
import VenueFormModal from '../../sections/admin/modals/VenueFormModal';
import AddSuccessModal from '../../sections/admin/modals/AddSuccessModal';

const MODAL = {
	FORM: 'form',
	CREATED: 'created',
	UPDATED: 'updated',
};

const TYPE_OPTIONS = [{ value: '', label: 'All types' }, ...VENUE_TYPES];

const STATUS_OPTIONS = [
	{ value: '', label: 'Any status' },
	{ value: 'true', label: 'In use' },
	{ value: 'false', label: 'Out of use' },
];

/**
 * Venues — the rooms classes are scheduled into.
 *
 * Previously seed-only: the API had full CRUD but nothing called it, so a room
 * could not be added without writing SQL, and the timetable had nowhere to put
 * a class.
 */
export default function AdminVenuesPage() {
	const { search, filters, page, setSearch, setFilters, setPage } =
		useVenueQuery();
	const { modal, open, close, openBriefly } = useModal();

	const debouncedSearch = useDebouncedValue(search);

	const params = useMemo(
		() => ({
			page,
			search: debouncedSearch || undefined,
			type: filters.type || undefined,
			is_active: filters.is_active || undefined,
		}),
		[page, debouncedSearch, filters],
	);

	const { data, isPending, isError, error, refetch } = useAdminVenues(params);

	const venues = data?.data ?? [];
	const meta = data?.meta ?? {};

	// openBriefly cancels its own timer if anything else opens meanwhile, so a
	// confirmation cannot dismiss a dialog the admin opened after it.
	const handleSuccess = (type) => openBriefly(type);

	return (
		<EntityPageShell title='Venues'>
			<div className='flex flex-col gap-3 px-4 pt-4 lg:flex-row lg:items-center lg:justify-between'>
				<p className='text-sm text-label'>
					Lecture halls, labs and other rooms classes can be scheduled
					into.
				</p>
				<Button onClick={() => open(MODAL.FORM, null)}>
					Add Venue
				</Button>
			</div>

			<div className='flex flex-col gap-3 p-4'>
				<SearchInput
					value={search}
					onChange={setSearch}
					placeholder='Search by code, name or building…'
					className='w-full'
				/>
				<div className='flex flex-wrap items-center gap-2'>
					<FilterSelect
						label='Filter by type'
						value={filters.type}
						onChange={(value) =>
							setFilters({ ...filters, type: value })
						}
						options={TYPE_OPTIONS}
					/>
					<FilterSelect
						label='Filter by status'
						value={filters.is_active}
						onChange={(value) =>
							setFilters({ ...filters, is_active: value })
						}
						options={STATUS_OPTIONS}
					/>
				</div>
			</div>

			<VenueTable
				venues={venues}
				loading={isPending}
				error={isError ? getErrorMessage(error) : null}
				onRetry={refetch}
				onEdit={(venue) => open(MODAL.FORM, venue)}
				onAdd={() => open(MODAL.FORM, null)}
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
				{modal.type === MODAL.FORM && (
					<VenueFormModal
						venue={modal.data}
						onClose={close}
						onSuccess={(wasEditing) =>
							handleSuccess(
								wasEditing ? MODAL.UPDATED : MODAL.CREATED,
							)
						}
					/>
				)}
				{modal.type === MODAL.CREATED && (
					<AddSuccessModal
						onClose={close}
						text='Venue Created Successfully'
					/>
				)}
				{modal.type === MODAL.UPDATED && (
					<AddSuccessModal
						onClose={close}
						text='Venue Updated Successfully'
					/>
				)}
			</AnimatePresence>
		</EntityPageShell>
	);
}
