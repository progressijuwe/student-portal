import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useStudentQuery } from '../../hooks/useStudentQuery';
import { useAdminUsers } from '../../hooks/admin/useAdminUsers';
import {
	useDeleteUser,
	useResetUserPassword,
} from '../../hooks/admin/useUserMutations';
import { useModal } from '../../hooks/useModal';
import { useCsvDownload } from '../../hooks/useCsvDownload';
import { exportUsers } from '../../api/admin';
import { useDepartments } from '../../hooks/useDepartments';
import { buildStudentFilterFields } from '../../constants/filterConfig';
import TableToolbar from '../../components/shared/TableToolbar';
import StudentTable from '../../sections/admin/students/StudentTable';
import Pagination from '../../components/ui/Pagination';
import AddStudentModal from '../../sections/admin/modals/AddStudentModal';
import AddSuccessModal from '../../sections/admin/modals/AddSuccessModal';
import UserCredentialsModal from '../../sections/admin/modals/UserCredentialsModal';
import BulkImportModal from '../../sections/admin/modals/BulkImportModal';
import FilterModal from '../../sections/admin/modals/FilterModal';
import DeleteUserModal from '../../sections/admin/modals/DeleteUserModal';
import EditStudentModal from '../../sections/admin/modals/EditStudentModal';
import ProfileModal from '../../sections/admin/modals/ProfileModal';
import EntityPageShell from '../../components/ui/EntityPageShell';

const MODAL = {
	ADD: 'add',
	// Creation and password resets both end on the credentials modal rather
	// than the generic success toast: the temporary password is only readable
	// there, and the admin has to copy it before it is gone.
	CREDENTIALS: 'credentials',
	RESET_CREDENTIALS: 'reset-credentials',
	IMPORT: 'import',
	FILTER: 'filter',
	VIEW: 'view',
	DELETE: 'delete',
	DELETE_SUCCESS: 'delete-success',
	EDIT: 'edit',
	EDIT_SUCCESS: 'edit-success',
};

/**
 * Maps a UserResource onto the shape the table renders *and* the edit form
 * seeds itself from.
 *
 * UserForm builds its initial values with `data[field.name]`, so the keys here
 * must match the field names in `studentFields` exactly. They previously did
 * not — `department` held a name where the form wanted `department_id`,
 * `enrollmentYear` where it wanted `entry_year`, and `study_type` and
 * `faculty_id` were absent entirely, so four fields opened blank.
 *
 * The display keys (`department`, `level`, `enrollmentYear`) are kept because
 * the shared table row and profile drawer read them.
 */
function transformStudent(user) {
	return {
		id: user.student_id,
		rawId: user.id,
		name: user.name,
		email: user.email,
		phone: user.phone,
		profilePhoto: user.profile_photo_url,

		// Display
		department: user.department?.name,
		level: user.level?.replace(' Level', ''),
		enrollmentYear: user.entry_year ? String(user.entry_year) : '',

		// Drives the "Reset requested" badge — the only signal an admin gets
		// that someone is locked out, since nothing is emailed.
		resetRequestedAt: user.password_reset_requested_at ?? null,

		// Form values — names must match `studentFields`
		study_type: user.study_type ?? '',
		entry_year: user.entry_year ? String(user.entry_year) : '',
		faculty_id: user.department?.faculty_id
			? String(user.department.faculty_id)
			: '',
		department_id: user.department?.id ? String(user.department.id) : '',
	};
}

export default function AdminStudentsPage() {
	const { search, filters, page, setSearch, setFilters, setPage } =
		useStudentQuery();
	const { modal, open, close, openBriefly } = useModal();
	const { mutateAsync: deleteUser } = useDeleteUser();
	const { mutateAsync: resetPassword } = useResetUserPassword();
	const exportCsv = useCsvDownload();
	const { data: departments = [] } = useDepartments();
	const studentFilterFields = buildStudentFilterFields(departments);

	const [debouncedSearch, setDebouncedSearch] = useState(search);

	useEffect(() => {
		const t = setTimeout(() => setDebouncedSearch(search), 300);
		return () => clearTimeout(t);
	}, [search]);

	// Named once so the export sends exactly the filters the table was built
	// from. `page` is deliberately excluded: the export covers the whole
	// matching set, not the slice on screen.
	const exportParams = {
		role: 'student',
		search: debouncedSearch || undefined,
		faculty_id: filters.faculty_id || undefined,
		department_id: filters.department_id || undefined,
		level: filters.level || undefined,
		// Was missing: the filter modal wrote entry_year to the URL but it was
		// never forwarded, so the request was identical and the cached result
		// came straight back.
		entry_year: filters.entry_year || undefined,
		reset_requested: filters.reset_requested || undefined,
	};

	const { data, isLoading, isError, refetch } = useAdminUsers({
		...exportParams,
		page,
	});

	const students = (data?.data ?? []).map(transformStudent);
	const totalPages = data?.meta?.last_page ?? 1;
	const total = data?.meta?.total ?? 0;

	const handleView = (student) => open(MODAL.VIEW, student);
	const handleEdit = (student) => open(MODAL.EDIT, student);
	const handleDelete = (student) => open(MODAL.DELETE, student);

	// openBriefly cancels its own timer if anything else opens meanwhile, so a
	// confirmation cannot dismiss a dialog the admin opened after it.
	const handleSuccess = (type) => openBriefly(type);

	const handleConfirmDelete = async (student) => {
		await deleteUser(student.rawId);
		handleSuccess(MODAL.DELETE_SUCCESS);
	};

	const handleResetPassword = async (student) => {
		const result = await resetPassword(student.rawId);
		open(MODAL.RESET_CREDENTIALS, result);
	};

	return (
		<EntityPageShell title='Students'>
			<TableToolbar
				search={search}
				onSearch={setSearch}
				onAdd={() => open(MODAL.ADD)}
				onFilter={() => open(MODAL.FILTER)}
				onImport={() => open(MODAL.IMPORT)}
				// Exports exactly what the filters currently describe, not the
				// page being displayed.
				onExport={() =>
					exportCsv.download(
						() => exportUsers(exportParams),
						`students-${new Date().toISOString().slice(0, 10)}.csv`,
					)
				}
				isExporting={exportCsv.isDownloading}
				exportError={exportCsv.error}
				addLabel='Add Student'
				searchPlaceholder='Search students'
			/>
			<StudentTable
				students={students}
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
					perPage={20}
					onPageChange={setPage}
				/>
			)}
			<AnimatePresence>
				{modal.type === MODAL.ADD && (
					<AddStudentModal
						onClose={close}
						onSuccess={(created) =>
							open(MODAL.CREDENTIALS, created)
						}
					/>
				)}
				{modal.type === MODAL.CREDENTIALS && (
					<UserCredentialsModal
						heading='Student Added'
						description={`${modal.data?.name} can now sign in with the password below.`}
						user={modal.data}
						onClose={close}
					/>
				)}
				{modal.type === MODAL.RESET_CREDENTIALS && (
					<UserCredentialsModal
						heading='Password Reset'
						description={`${modal.data?.name} can now sign in with the password below.`}
						user={modal.data}
						onClose={close}
					/>
				)}
				{modal.type === MODAL.IMPORT && (
					<BulkImportModal role='student' onClose={close} />
				)}
				{modal.type === MODAL.FILTER && (
					<FilterModal
						heading='Filter Students'
						fields={studentFilterFields}
						onClose={close}
						onApply={setFilters}
						initialFilters={filters}
					/>
				)}
				{modal.type === MODAL.DELETE && (
					<DeleteUserModal
						onClose={close}
						onConfirm={() => handleConfirmDelete(modal.data)}
						heading='Delete Student'
						description='Are you sure you want to delete this student? This will remove all their records, course registrations, and academic history'
					/>
				)}
				{modal.type === MODAL.DELETE_SUCCESS && (
					<AddSuccessModal
						onClose={close}
						text='Student Deleted Successfully'
					/>
				)}
				{modal.type === MODAL.EDIT && (
					<EditStudentModal
						student={modal.data}
						onClose={close}
						onSuccess={() => handleSuccess(MODAL.EDIT_SUCCESS)}
					/>
				)}
				{modal.type === MODAL.EDIT_SUCCESS && (
					<AddSuccessModal
						onClose={close}
						text='Student Updated Successfully'
					/>
				)}
				{modal.type === MODAL.VIEW && (
					<ProfileModal
						heading='Student Profile'
						user={modal.data}
						userType='student'
						onClose={close}
						onEdit={handleEdit}
						onDelete={handleDelete}
						onResetPassword={handleResetPassword}
					/>
				)}
			</AnimatePresence>
		</EntityPageShell>
	);
}
