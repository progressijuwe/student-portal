import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTimetableQuery } from '../../hooks/useTimetableQuery';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { useAdminTimetable } from '../../hooks/admin/useAdminTimetable';
import { useAcademicSessions } from '../../hooks/useAcademicSessions';
import { useVenueOptions } from '../../hooks/admin/useVenueOptions';
import { useLecturerOptions } from '../../hooks/admin/useLecturerOptions';
import { useModal } from '../../hooks/useModal';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { DAYS } from '../../constants/venues';
import { Button } from '../../components/ui/Button';
import EntityPageShell from '../../components/ui/EntityPageShell';
import Pagination from '../../components/ui/Pagination';
import SearchInput from '../../components/ui/SearchInput';
import { FilterSelect } from '../../sections/admin/shared/AdminFilterBar';
import TimetableTable from '../../sections/admin/timetable/TimetableTable';
import TimetableSlotModal from '../../sections/admin/modals/TimetableSlotModal';
import AddSuccessModal from '../../sections/admin/modals/AddSuccessModal';

const MODAL = {
	FORM: 'form',
	CREATED: 'created',
	UPDATED: 'updated',
};

const DAY_OPTIONS = [{ value: '', label: 'All days' }, ...DAYS];

const SEMESTER_OPTIONS = [
	{ value: '', label: 'All semesters' },
	{ value: 'first', label: 'First Semester' },
	{ value: 'second', label: 'Second Semester' },
];

const STATUS_OPTIONS = [
	{ value: '', label: 'Any status' },
	{ value: 'true', label: 'Scheduled' },
	{ value: 'false', label: 'Cancelled' },
];

/**
 * Timetable — which course runs in which room, when.
 *
 * Previously the one part of the system with no way in at all: the API had full
 * CRUD and conflict detection, but nothing called it, so timetables could only
 * be created by writing SQL.
 */
export default function AdminTimetablePage() {
	const { search, filters, page, setSearch, setFilters, setPage } =
		useTimetableQuery();
	const { modal, open, close, openBriefly } = useModal();

	const { data: sessions = [] } = useAcademicSessions();
	const { options: venueOptions } = useVenueOptions();
	const { options: lecturerOptions } = useLecturerOptions();

	const debouncedSearch = useDebouncedValue(search);

	const params = useMemo(
		() => ({
			page,
			search: debouncedSearch || undefined,
			session_id: filters.session_id || undefined,
			semester: filters.semester || undefined,
			day: filters.day || undefined,
			venue_id: filters.venue_id || undefined,
			lecturer_id: filters.lecturer_id || undefined,
			is_active: filters.is_active || undefined,
		}),
		[page, debouncedSearch, filters],
	);

	const { data, isPending, isError, error, refetch } =
		useAdminTimetable(params);

	const slots = data?.data ?? [];
	const meta = data?.meta ?? {};

	const sessionOptions = useMemo(
		() => [
			{ value: '', label: 'All sessions' },
			...sessions.map((session) => ({
				value: String(session.id),
				label: session.is_current
					? `${session.name} (current)`
					: session.name,
			})),
		],
		[sessions],
	);

	// openBriefly cancels its own timer if anything else opens meanwhile, so a
	// confirmation cannot dismiss a dialog the admin opened after it.
	const handleSuccess = (type) => openBriefly(type);

	return (
		<EntityPageShell title='Timetable'>
			<div className='flex flex-col gap-3 px-4 pt-4 lg:flex-row lg:items-center lg:justify-between'>
				<p className='text-sm text-label'>
					Weekly classes. The system rejects a slot that double-books
					a room, a lecturer, or a year group.
				</p>
				<Button onClick={() => open(MODAL.FORM, null)}>
					Add Class
				</Button>
			</div>

			<div className='flex flex-col gap-3 p-4'>
				<SearchInput
					value={search}
					onChange={setSearch}
					placeholder='Search by course code or title…'
					className='w-full'
				/>
				<div className='flex flex-wrap items-center gap-2'>
					<FilterSelect
						label='Filter by session'
						value={filters.session_id}
						onChange={(value) =>
							setFilters({ ...filters, session_id: value })
						}
						options={sessionOptions}
					/>
					<FilterSelect
						label='Filter by semester'
						value={filters.semester}
						onChange={(value) =>
							setFilters({ ...filters, semester: value })
						}
						options={SEMESTER_OPTIONS}
					/>
					<FilterSelect
						label='Filter by day'
						value={filters.day}
						onChange={(value) =>
							setFilters({ ...filters, day: value })
						}
						options={DAY_OPTIONS}
					/>
					<FilterSelect
						label='Filter by venue'
						value={filters.venue_id}
						onChange={(value) =>
							setFilters({ ...filters, venue_id: value })
						}
						options={[
							{ value: '', label: 'All venues' },
							...venueOptions,
						]}
					/>
					<FilterSelect
						label='Filter by lecturer'
						value={filters.lecturer_id}
						onChange={(value) =>
							setFilters({ ...filters, lecturer_id: value })
						}
						options={[
							{ value: '', label: 'All lecturers' },
							...lecturerOptions,
						]}
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

			<TimetableTable
				slots={slots}
				loading={isPending}
				error={isError ? getErrorMessage(error) : null}
				onRetry={refetch}
				onEdit={(slot) => open(MODAL.FORM, slot)}
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
					<TimetableSlotModal
						slot={modal.data}
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
						text='Class Scheduled Successfully'
					/>
				)}
				{modal.type === MODAL.UPDATED && (
					<AddSuccessModal
						onClose={close}
						text='Class Updated Successfully'
					/>
				)}
			</AnimatePresence>
		</EntityPageShell>
	);
}
