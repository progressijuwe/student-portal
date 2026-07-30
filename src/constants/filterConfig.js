const currentYear = new Date().getFullYear();

const enrollmentYearOptions = [
	{ label: 'All years', value: '' },
	...Array.from({ length: 7 }, (_, i) => {
		const year = currentYear - i;
		return { label: String(year), value: String(year) };
	}),
];

export function buildStudentFilterFields(facultiesWithDepartments = []) {
	const facultyOptions = [
		{ label: 'All faculties', value: '' },
		...facultiesWithDepartments.map((f) => ({
			label: f.name,
			value: String(f.id),
		})),
	];

	const departmentOptions = [
		{ label: 'All departments', value: '' },
		...facultiesWithDepartments.flatMap((f) =>
			(f.departments ?? []).map((d) => ({
				label: d.name,
				value: String(d.id),
			})),
		),
	];

	return [
		{ name: 'faculty_id', label: 'Faculty', options: facultyOptions },
		{
			name: 'department_id',
			label: 'Department',
			options: departmentOptions,
		},
		{
			name: 'level',
			label: 'Level',
			options: [
				{ label: 'All levels', value: '' },
				{ label: '100', value: '100' },
				{ label: '200', value: '200' },
				{ label: '300', value: '300' },
				{ label: '400', value: '400' },
				{ label: '500', value: '500' },
			],
		},
		{
			name: 'entry_year',
			label: 'Entry Year',
			options: enrollmentYearOptions,
		},
	];
}
