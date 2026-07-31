import AdminFilterBar from '../shared/AdminFilterBar';

export default function RegistrationToolbar({
	search,
	onSearch,
	filters,
	onFilterChange,
}) {
	return (
		<AdminFilterBar
			search={search}
			onSearch={onSearch}
			filters={filters}
			onFilterChange={onFilterChange}
			searchPlaceholder='Search by student name or matric number…'
		/>
	);
}
