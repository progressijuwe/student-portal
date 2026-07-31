const currentYear = new Date().getFullYear();

const enrollmentYearOptions = [
	{ label: 'All years', value: '' },
	...Array.from({ length: 7 }, (_, i) => {
		const year = currentYear - i;
		return { label: String(year), value: String(year) };
	}),
];

const levelOptions = [
	{ label: 'All levels', value: '' },
	{ label: '100', value: '100' },
	{ label: '200', value: '200' },
	{ label: '300', value: '300' },
	{ label: '400', value: '400' },
	{ label: '500', value: '500' },
];

/**
 * Faculty and department options built from live reference data.
 *
 * Values are ids, not display names: the API filters on ids, and filtering on
 * names silently breaks the moment a department is renamed.
 */
function buildOrganisationFields(facultiesWithDepartments = []) {
	const facultyOptions = [
		{ label: 'All faculties', value: '' },
		...facultiesWithDepartments.map((faculty) => ({
			label: faculty.name,
			value: String(faculty.id),
		})),
	];

	const departmentOptions = [
		{ label: 'All departments', value: '' },
		...facultiesWithDepartments.flatMap((faculty) =>
			(faculty.departments ?? []).map((department) => ({
				label: department.name,
				value: String(department.id),
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
	];
}

export function buildStudentFilterFields(facultiesWithDepartments = []) {
	return [
		...buildOrganisationFields(facultiesWithDepartments),
		{ name: 'level', label: 'Level', options: levelOptions },
		{
			name: 'entry_year',
			label: 'Entry Year',
			options: enrollmentYearOptions,
		},
	];
}

export function buildLecturerFilterFields(facultiesWithDepartments = []) {
	return buildOrganisationFields(facultiesWithDepartments);
}

export function buildCourseFilterFields(facultiesWithDepartments = []) {
	return [
		...buildOrganisationFields(facultiesWithDepartments),
		{ name: 'level', label: 'Level', options: levelOptions },
		{
			name: 'semester',
			label: 'Semester',
			options: [
				{ label: 'All semesters', value: '' },
				{ label: 'First', value: 'first' },
				{ label: 'Second', value: 'second' },
			],
		},
		{
			name: 'type',
			label: 'Type',
			options: [
				{ label: 'All types', value: '' },
				{ label: 'Compulsory', value: 'compulsory' },
				{ label: 'Elective', value: 'elective' },
			],
		},
	];
}
