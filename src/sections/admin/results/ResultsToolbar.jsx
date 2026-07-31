import AdminFilterBar from '../shared/AdminFilterBar';

export default function ResultsToolbar({
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
			searchPlaceholder='Search by course name or code…'
		/>
	);
}
