import { AnimatePresence } from "framer-motion";
import { useEntityPage } from "../../hooks/useEntityPage";
import { useStudentQuery } from "../../hooks/useStudentQuery";
import { filterStudents } from "../../utils/filterStudents";
import { studentFilterFields } from "../../constants/filterConfig";
import TableToolbar from "../../components/shared/TableToolbar";
import StudentTable from "../../sections/admin/students/StudentTable";
import Pagination from "../../components/ui/Pagination";
import AddStudentModal from "../../sections/admin/modals/AddStudentModal";
import AddSuccessModal from "../../sections/admin/modals/AddSuccessModal";
import FilterModal from "../../sections/admin/modals/FilterModal";
import DeleteUserModal from "../../sections/admin/modals/DeleteUserModal";
import UpdateStudentModal from "../../sections/admin/modals/UpdateStudentModal";
import ProfileModal from "../../sections/admin/modals/ProfileModal";
import EntityPageShell from "../../components/ui/EntityPageShell";

import { studentsData } from "../../data/studentsData";

const MODAL = {
	ADD: "add",
	SUCCESS: "success",
	FILTER: "filter",
	VIEW: "view",
	DELETE: "delete",
	DELETE_SUCCESS: "delete-success",
	EDIT: "edit",
	EDIT_SUCCESS: "edit-success",
};

export default function AdminStudentsPage() {
	const {
		search,
		filters,
		page,
		setSearch,
		setFilters,
		setPage,
		items,
		filteredItems,
		totalPages,
		loading,
		error,
		modal,
		open,
		close,
		fetchItems,
		handleView,
		handleEdit,
		handleDelete,
		handleSuccess,
	} = useEntityPage({
		data: studentsData,
		filterFn: filterStudents,
		useQueryHook: useStudentQuery,
		modals: MODAL,
	});

	const openStudentModal = () => open(MODAL.ADD);
	const openFilterModal = () => open(MODAL.FILTER);

	return (
		<EntityPageShell title='Students'>
			<TableToolbar
				search={search}
				onSearch={setSearch}
				onAdd={() => open(MODAL.ADD)}
				onFilter={() => open(MODAL.FILTER)}
				addLabel='Add Student'
				searchPlaceholder='Search students'
			/>
			<StudentTable
				students={items}
				loading={loading}
				error={error}
				onRetry={fetchItems}
				onView={handleView}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>
			{!error && !loading && totalPages > 1 && (
				<Pagination
					page={page}
					total={filteredItems.length}
					perPage={8}
					onPageChange={setPage}
				/>
			)}
			<AnimatePresence>
				{modal.type === MODAL.ADD && (
					<AddStudentModal
						onClose={close}
						onSuccess={() => handleSuccess(MODAL.SUCCESS)}
					/>
				)}
				{modal.type === MODAL.SUCCESS && (
					<AddSuccessModal onClose={close} text='Student Added Successfully' />
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
						student={modal.data}
						onClose={close}
						onSuccess={() => handleSuccess(MODAL.DELETE_SUCCESS)}
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
					<UpdateStudentModal
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
