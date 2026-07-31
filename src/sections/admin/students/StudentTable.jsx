import DataTable from '../../../components/ui/DataTable';
import UserRow from '../../../components/shared/UserRow';
import UserCard from '../../../components/shared/UserCard';
import UserTableSkeleton from '../../../components/shared/UserTableSkeleton';

const columns = [
	{ key: 'id', label: 'Student ID' },
	{ key: 'name', label: 'Name' },
	{ key: 'contact', label: 'Contact' },
	{ key: 'department', label: 'Department' },
	{ key: 'level', label: 'Level' },
	{
		key: 'enrollmentYear',
		label: 'Enrollment Year',
		className: 'text-nowrap',
	},
	{ key: 'actions', label: 'Actions', className: 'text-center' },
];

export default function StudentTable({
	students,
	loading,
	error,
	onRetry,
	onView,
	onEdit,
	onDelete,
}) {
	return (
		<DataTable
			items={students}
			loading={loading}
			error={error}
			onRetry={onRetry}
			columns={columns}
			caption='List of students with their details'
			headingId='students-table-heading'
			Skeleton={() => <UserTableSkeleton cols={7} />}
			renderRow={(student) => (
				<UserRow
					key={student.id}
					user={student}
					onView={onView}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			)}
			renderCard={(student) => (
				<UserCard
					key={student.id}
					user={student}
					onView={onView}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			)}
		/>
	);
}
