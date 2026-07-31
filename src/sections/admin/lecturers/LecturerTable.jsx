import DataTable from '../../../components/ui/DataTable';
import UserRow from '../../../components/shared/UserRow';
import UserCard from '../../../components/shared/UserCard';
import UserTableSkeleton from '../../../components/shared/UserTableSkeleton';

const columns = [
	{ key: 'id', label: 'Staff ID' },
	{ key: 'name', label: 'Name' },
	{ key: 'contact', label: 'Contact' },
	{ key: 'department', label: 'Department' },
	{ key: 'qualification', label: 'Courses' },
	{ key: 'joinYear', label: 'Year Registered', className: 'text-nowrap' },
	{ key: 'actions', label: 'Actions', className: 'text-center' },
];

export default function LecturerTable({
	lecturers,
	loading,
	error,
	onRetry,
	onView,
	onEdit,
	onDelete,
}) {
	return (
		<DataTable
			items={lecturers}
			loading={loading}
			error={error}
			onRetry={onRetry}
			columns={columns}
			caption='List of lecturers with their details'
			headingId='lecturers-table-heading'
			Skeleton={() => <UserTableSkeleton cols={7} />}
			renderRow={(lecturer) => (
				<UserRow
					key={lecturer.id}
					user={lecturer}
					onView={onView}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			)}
			renderCard={(lecturer) => (
				<UserCard
					key={lecturer.id}
					user={lecturer}
					onView={onView}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			)}
		/>
	);
}
