import { AnimatePresence } from 'framer-motion';
import { useCourseQuery } from '../../hooks/useCourseQuery';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import {
	useAdminCourses,
	useSetCourseActive,
} from '../../hooks/admin/useAdminCourses';
import { useModal } from '../../hooks/useModal';
import { useDepartments } from '../../hooks/useDepartments';
import { buildCourseFilterFields } from '../../constants/filterConfig';
import { getErrorMessage } from '../../utils/getErrorMessage';
import TableToolbar from '../../components/shared/TableToolbar';
import CourseGrid from '../../sections/admin/courses/CourseGrid';
import Pagination from '../../components/ui/Pagination';
import AddCourseModal from '../../sections/admin/modals/AddCourseModal';
import AddSuccessModal from '../../sections/admin/modals/AddSuccessModal';
import DeleteUserModal from '../../sections/admin/modals/DeleteUserModal';
import FilterModal from '../../sections/admin/modals/FilterModal';
import EditCourseModal from '../../sections/admin/modals/EditCourseModal';
import EntityPageShell from '../../components/ui/EntityPageShell';

const MODAL = {
	ADD: 'add',
	SUCCESS: 'success',
	FILTER: 'filter',
	DELETE: 'delete',
	DELETE_SUCCESS: 'delete-success',
	EDIT: 'edit',
	EDIT_SUCCESS: 'edit-success',
};

export default function AdminCoursesPage() {
	const { search, filters, page, setSearch, setFilters, setPage } =
		useCourseQuery();
	const { modal, open, close } = useModal();
	const { data: departments = [] } = useDepartments();
	const setCourseActive = useSetCourseActive();

	const debouncedSearch = useDebouncedValue(search);

	const { data, isLoading, isError, error, refetch } = useAdminCourses({
		page,
		search: debouncedSearch || undefined,
		faculty_id: filters.faculty_id || undefined,
		department_id: filters.department_id || undefined,
		level: filters.level || undefined,
		semester: filters.semester || undefined,
		type: filters.type || undefined,
	});

	const courses = data?.data ?? [];
	const meta = data?.meta ?? {};

	const handleEdit = (course) => open(MODAL.EDIT, course);
	const handleDelete = (course) => open(MODAL.DELETE, course);

	const handleSuccess = (type) => {
		open(type);
		setTimeout(close, 2000);
	};

	// "Delete" deactivates. Every foreign key into courses is restrictOnDelete,
	// so a real delete would either fail or orphan a transcript.
	const handleConfirmDeactivate = async (course) => {
		await setCourseActive.mutateAsync({
			courseId: course.id,
			isActive: false,
		});
		handleSuccess(MODAL.DELETE_SUCCESS);
	};

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
				courses={courses}
				loading={isLoading}
				error={isError ? getErrorMessage(error) : null}
				onRetry={refetch}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>

			{!isError && !isLoading && meta.last_page > 1 && (
				<Pagination
					page={meta.current_page}
					total={meta.total}
					perPage={meta.per_page}
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
					<AddSuccessModal
						onClose={close}
						text='Course Added Successfully'
					/>
				)}
				{modal.type === MODAL.FILTER && (
					<FilterModal
						heading='Filter Courses'
						fields={buildCourseFilterFields(departments)}
						onClose={close}
						onApply={setFilters}
						initialFilters={filters}
					/>
				)}
				{modal.type === MODAL.DELETE && (
					<DeleteUserModal
						onClose={close}
						onConfirm={() => handleConfirmDeactivate(modal.data)}
						heading='Deactivate Course'
						description='This course will stop appearing for registration. Existing enrollments, grades and transcripts are kept intact, and it can be reactivated at any time.'
					/>
				)}
				{modal.type === MODAL.DELETE_SUCCESS && (
					<AddSuccessModal
						onClose={close}
						text='Course Deactivated Successfully'
					/>
				)}
				{modal.type === MODAL.EDIT && (
					<EditCourseModal
						course={modal.data}
						onClose={close}
						onSuccess={() => handleSuccess(MODAL.EDIT_SUCCESS)}
					/>
				)}
				{modal.type === MODAL.EDIT_SUCCESS && (
					<AddSuccessModal
						onClose={close}
						text='Course Updated Successfully'
					/>
				)}
			</AnimatePresence>
		</EntityPageShell>
	);
}
