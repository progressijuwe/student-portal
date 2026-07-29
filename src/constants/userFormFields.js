export const studentFields = [
	{
		label: 'Full Name',
		type: 'text',
		name: 'name',
		placeholder: 'Enter full name',
		id: 'student-name',
		required: true,
	},
	{
		label: 'Email Address',
		type: 'email',
		name: 'email',
		placeholder: 'Enter email address',
		id: 'student-email',
		required: true,
		validate: (value) =>
			!/\S+@\S+\.\S+/.test(value) ? 'Invalid email format' : null,
	},
	{
		label: 'Study Type',
		type: 'select',
		name: 'study_type',
		id: 'student-study-type',
		options: ['Undergraduate', 'Postgraduate'],
		required: true,
	},
	{
		label: 'Entry Year',
		type: 'number',
		name: 'entry_year',
		placeholder: 'e.g. 2024',
		id: 'student-entry-year',
		required: true,
		validate: (value) => {
			const year = Number(value);
			const currentYear = new Date().getFullYear();
			if (!/^\d{4}$/.test(value)) return 'Enter a valid 4-digit year';
			if (year < 2000 || year > currentYear)
				return `Year must be between 2000 and ${currentYear}`;
			return null;
		},
	},
	{
		label: 'Faculty',
		type: 'select',
		name: 'faculty_id',
		id: 'student-faculty',
		required: true,
	},
	{
		label: 'Department',
		type: 'select',
		name: 'department_id',
		id: 'student-department',
		dependsOn: 'faculty_id',
		required: true,
	},
];

export const lecturerFields = [
	{
		label: 'Prefix',
		type: 'select',
		name: 'prefix',
		id: 'lecturer-prefix',
		options: ['Dr.', 'Prof.', 'Mr.', 'Mrs.', 'Ms.', 'Engr.', 'Rev.'],
		required: true,
	},
	{
		label: 'Full Name',
		type: 'text',
		name: 'name',
		placeholder: 'Enter full name',
		id: 'lecturer-name',
		required: true,
	},
	{
		label: 'Email Address',
		type: 'email',
		name: 'email',
		placeholder: 'Enter email address',
		id: 'lecturer-email',
		required: true,
		validate: (value) =>
			!/\S+@\S+\.\S+/.test(value) ? 'Invalid email format' : null,
	},
	{
		label: 'Faculty',
		type: 'select',
		name: 'faculty_id',
		id: 'lecturer-faculty',
		required: true,
	},
	{
		label: 'Department',
		type: 'select',
		name: 'department_id',
		id: 'lecturer-department',
		dependsOn: 'faculty_id',
		required: true,
	},
	{
		label: 'Highest Qualification',
		type: 'text',
		name: 'highest_qualification',
		id: 'lecturer-qualification',
		placeholder: 'e.g. PhD Computer Science',
		required: true,
	},
	{
		label: 'Specialization',
		type: 'text',
		name: 'specialization',
		id: 'lecturer-specialization',
		placeholder: 'e.g. Artificial Intelligence',
	},
];
