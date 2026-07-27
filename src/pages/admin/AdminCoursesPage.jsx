import { AnimatePresence } from "framer-motion";
import { useEntityPage } from "../../hooks/useEntityPage";
import { useCourseQuery } from "../../hooks/useCourseQuery";
import { filterCourses } from "../../utils/filterCourses";
import { courseFilterFields } from "../../constants/filterConfig";
import TableToolbar from "../../components/shared/TableToolbar";
import CourseGrid from "../../sections/admin/courses/CourseGrid";
import Pagination from "../../components/ui/Pagination";
import AddCourseModal from "../../sections/admin/modals/AddCourseModal";
import AddSuccessModal from "../../sections/admin/modals/AddSuccessModal";
import DeleteUserModal from "../../sections/admin/modals/DeleteUserModal";
import FilterModal from "../../sections/admin/modals/FilterModal";
import EntityPageShell from "../../components/ui/EntityPageShell";
import { coursesData } from "../../data/courseData";
import EditCourseModal from "../../sections/admin/modals/EditCourseModal";

const MODAL = {
	ADD: "add",
	SUCCESS: "success",
	FILTER: "filter",
	DELETE: "delete",
	DELETE_SUCCESS: "delete-success",
	EDIT: "edit",
	EDIT_SUCCESS: "edit-success",
};

export default function AdminCoursesPage() {
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
		handleEdit,
		handleDelete,
		handleSuccess,
	} = useEntityPage({
		data: coursesData,
		filterFn: filterCourses,
		useQueryHook: useCourseQuery,
	});

	return (
		<EntityPageShell title='Courses'>
			<TableToolbar
				search={search}
				onSearch={setSearch}
				onAdd={() => open(MODAL.ADD)}
				onFilter={() => open(MODAL.FILTER)}
				addLabel='Add Course'
				searchPlaceholder='Search courses'
			/>
			<CourseGrid
				courses={items}
				loading={loading}
				error={error}
				onRetry={fetchItems}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>
			{!error && !loading && totalPages > 1 && (
				<Pagination
					page={page}
					total={filteredItems.length}
					perPage={12}
					onPageChange={setPage}
				/>
			)}
			<AnimatePresence>
				{modal.type === MODAL.ADD && (
					<AddCourseModal
						onClose={close}
						onSuccess={() => handleSuccess(MODAL.SUCCESS)}
					/>
				)}
				{modal.type === MODAL.SUCCESS && (
					<AddSuccessModal onClose={close} text='Course Added Successfully' />
				)}
				{modal.type === MODAL.FILTER && (
					<FilterModal
						heading='Filter Courses'
						fields={courseFilterFields}
						onClose={close}
						onApply={setFilters}
						initialFilters={filters}
					/>
				)}
				{modal.type === MODAL.DELETE && (
					<DeleteUserModal
						course={modal.data}
						onClose={close}
						onSuccess={() => handleSuccess(MODAL.DELETE_SUCCESS)}
						heading='Delete Course'
						description='Are you sure you want to delete this course? This will remove the course and unassign all enrolled students.'
					/>
				)}
				{modal.type === MODAL.DELETE_SUCCESS && (
					<AddSuccessModal onClose={close} text='Course Deleted Successfully' />
				)}
				{modal.type === MODAL.EDIT && (
					<EditCourseModal
						course={modal.data}
						onClose={close}
						onSuccess={() => handleSuccess(MODAL.EDIT_SUCCESS)}
					/>
				)}
				{modal.type === MODAL.EDIT_SUCCESS && (
					<AddSuccessModal onClose={close} text='Course Updated Successfully' />
				)}
			</AnimatePresence>
		</EntityPageShell>
	);
}
