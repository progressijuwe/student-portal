import SearchInput from "../../../components/ui/SearchInput";

const levelOptions = ["All Levels", "100", "200", "300", "400", "500"];
const facultyOptions = [
	"All Faculties",
	"School of Computing",
	"School of Engineering",
	"School of Management",
];
const deptOptions = [
	"All Departments",
	"Software Engineering",
	"Computer Science",
	"Mechanical Engineering",
	"Business Administration",
	"Accounting",
];

function FilterSelect({ value, onChange, options }) {
	return (
		<select
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className=' w-full lg:max-w-2xs border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-orange'
		>
			{options.map((opt) => (
				<option key={opt} value={opt.startsWith("All") ? "" : opt}>
					{opt}
				</option>
			))}
		</select>
	);
}

export default function ResultsToolbar({
	search,
	onSearch,
	filters,
	onFilterChange,
}) {
	return (
		<div className='flex flex-col gap-3 p-4'>
			<SearchInput
				value={search}
				onChange={onSearch}
				placeholder='Search by course name or code...'
				className='w-full'
			/>
			<div className='flex flex-wrap items-center gap-2'>
				<FilterSelect
					value={filters.level}
					onChange={(val) => onFilterChange({ ...filters, level: val })}
					options={levelOptions}
				/>
				<FilterSelect
					value={filters.faculty}
					onChange={(val) => onFilterChange({ ...filters, faculty: val })}
					options={facultyOptions}
				/>
				<FilterSelect
					value={filters.department}
					onChange={(val) => onFilterChange({ ...filters, department: val })}
					options={deptOptions}
				/>
			</div>
		</div>
	);
}
