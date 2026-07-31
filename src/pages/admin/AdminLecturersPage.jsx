import { AnimatePresence } from 'framer-motion';
import { useLecturerQuery } from '../../hooks/useLecturerQuery';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { useAdminUsers } from '../../hooks/admin/useAdminUsers';
import { useDeleteUser } from '../../hooks/admin/useUserMutations';
import { useModal } from '../../hooks/useModal';
import { useDepartments } from '../../hooks/useDepartments';
import { buildLecturerFilterFields } from '../../constants/filterConfig';
import TableToolbar from '../../components/shared/TableToolbar';
import LecturerTable from '../../sections/admin/lecturers/LecturerTable';
import Pagination from '../../components/ui/Pagination';
import AddLecturerModal from '../../sections/admin/modals/AddLecturerModal';
import AddSuccessModal from '../../sections/admin/modals/AddSuccessModal';
import FilterModal from '../../sections/admin/modals/FilterModal';
import DeleteUserModal from '../../sections/admin/modals/DeleteUserModal';
import UpdateLecturerModal from '../../sections/admin/modals/UpdateLecturerModal';
import ProfileModal from '../../sections/admin/modals/ProfileModal';
import EntityPageShell from '../../components/ui/EntityPageShell';

const MODAL = {
	ADD: 'add',
	SUCCESS: 'success',
	FILTER: 'filter',
	VIEW: 'view',
	DELETE: 'delete',
	DELETE_SUCCESS: 'delete-success',
	EDIT: 'edit',
	EDIT_SUCCESS: 'edit-success',
};

/**
 * Maps a UserResource onto the shape the shared table row renders *and* the
 * edit form seeds itself from — see the note on transformStudent.
 *
 * `name` is the raw name, not `display_name`. Seeding the form with
 * "Dr. Adaeze Nwosu" meant saving the edit wrote the prefix into the name
 * field, and it compounded on every save.
 */
function transformLecturer(user) {
	return {
		id: user.staff_id,
		rawId: user.id,
		name: user.name,
		email: user.email,
		phone: user.phone,
		profilePhoto: user.profile_photo_url,

		// Display
		displayName: user.lecturer_profile?.display_name ?? user.name,
		department: user.department?.name,
		qualification: user.lecturer_profile?.highest_qualification,
		joinYear: user.created_at ? user.created_at.slice(0, 4) : '',

		// Form values — names must match `lecturerFields`
		prefix: user.lecturer_profile?.prefix ?? '',
		highest_qualification:
			user.lecturer_profile?.highest_qualification ?? '',
		specialization: user.lecturer_profile?.specialization ?? '',
		faculty_id: user.department?.faculty_id
			? String(user.department.faculty_id)
			: '',
		department_id: user.department?.id ? String(user.department.id) : '',
	};
}

export default function AdminLecturersPage() {
	const { search, filters, page, setSearch, setFilters, setPage } =
		useLecturerQuery();
	const { modal, open, close } = useModal();
	const { mutateAsync: deleteUser } = useDeleteUser();
	const { data: departments = [] } = useDepartments();

	const debouncedSearch = useDebouncedValue(search);

	const { data, isLoading, isError, refetch } = useAdminUsers({
		role: 'lecturer',
		page,
		search: debouncedSearch || undefined,
		faculty_id: filters.faculty_id || undefined,
		department_id: filters.department_id || undefined,
	});

	const lecturers = (data?.data ?? []).map(transformLecturer);
	const totalPages = data?.meta?.last_page ?? 1;
	const total = data?.meta?.total ?? 0;
	const perPage = data?.meta?.per_page ?? 20;

	const handleView = (lecturer) => open(MODAL.VIEW, lecturer);
	const handleEdit = (lecturer) => open(MODAL.EDIT, lecturer);
	const handleDelete = (lecturer) => open(MODAL.DELETE, lecturer);

	const handleSuccess = (type) => {
		open(type);
		setTimeout(close, 2000);
	};

	const handleConfirmDelete = async (lecturer) => {
		await deleteUser(lecturer.rawId);
		handleSuccess(MODAL.DELETE_SUCCESS);
	};

	return (
		<EntityPageShell title='Lecturers'>
			<TableToolbar
				search={search}
				onSearch={setSearch}
				onAdd={() => open(MODAL.ADD)}
				onFilter={() => open(MODAL.FILTER)}
				addLabel='Add Lecturer'
				searchPlaceholder='Search lecturers'
			/>
			<LecturerTable
				lecturers={lecturers}
				loading={isLoading}
				error={isError}
				onRetry={refetch}
				onView={handleView}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>
			{!isError && !isLoading && totalPages > 1 && (
				<Pagination
					page={page}
					total={total}
					perPage={perPage}
					onPageChange={setPage}
				/>
			)}
			<AnimatePresence>
				{modal.type === MODAL.ADD && (
					<AddLecturerModal
						onClose={close}
						onSuccess={() => handleSuccess(MODAL.SUCCESS)}
					/>
				)}
				{modal.type === MODAL.SUCCESS && (
					<AddSuccessModal
						onClose={close}
						text='Lecturer Added Successfully'
					/>
				)}
				{modal.type === MODAL.FILTER && (
					<FilterModal
						heading='Filter Lecturers'
						fields={buildLecturerFilterFields(departments)}
						onClose={close}
						onApply={setFilters}
						initialFilters={filters}
					/>
				)}
				{modal.type === MODAL.DELETE && (
					<DeleteUserModal
						onClose={close}
						onConfirm={() => handleConfirmDelete(modal.data)}
						heading='Delete Lecturer'
						description='Are you sure you want to delete this lecturer? Their account will be archived and they will lose access immediately. Course offerings they taught are retained.'
					/>
				)}
				{modal.type === MODAL.DELETE_SUCCESS && (
					<AddSuccessModal
						onClose={close}
						text='Lecturer Deleted Successfully'
					/>
				)}
				{modal.type === MODAL.EDIT && (
					<UpdateLecturerModal
						lecturer={modal.data}
						onClose={close}
						onSuccess={() => handleSuccess(MODAL.EDIT_SUCCESS)}
					/>
				)}
				{modal.type === MODAL.EDIT_SUCCESS && (
					<AddSuccessModal
						onClose={close}
						text='Lecturer Updated Successfully'
					/>
				)}
				{modal.type === MODAL.VIEW && (
					<ProfileModal
						heading='Lecturer Profile'
						user={modal.data}
						userType='lecturer'
						onClose={close}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
				)}
			</AnimatePresence>
		</EntityPageShell>
	);
}
