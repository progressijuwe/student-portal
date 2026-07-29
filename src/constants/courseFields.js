// constants/courseFields.js

export const courseFields = [
	{
		id: 'course-code',
		name: 'code',
		label: 'Course Code',
		type: 'text',
		placeholder: 'e.g., SEN 111',
		colSpan: 1,
	},
	{
		id: 'course-units',
		name: 'credit_units',
		label: 'Credit Units',
		type: 'select',
		placeholder: 'Select units',
		colSpan: 1,
		options: ['1', '2', '3', '4', '5', '6'],
	},
	{
		id: 'course-title',
		name: 'title',
		label: 'Course Title',
		type: 'text',
		placeholder: 'Enter course title',
		colSpan: 2,
	},
	{
		id: 'course-department',
		name: 'department_id',
		label: 'Department',
		type: 'select',
		placeholder: 'Select department',
		colSpan: 1,
		// options populated dynamically from real departments — see AddCourseModal
	},
	{
		id: 'course-level',
		name: 'level',
		label: 'Level',
		type: 'select',
		placeholder: 'Select level',
		colSpan: 1,
		options: ['100', '200', '300', '400', '500'],
	},
	{
		id: 'course-type',
		name: 'type',
		label: 'Course Type',
		type: 'select',
		placeholder: 'Select type',
		colSpan: 1,
		options: [
			{ value: 'compulsory', label: 'Compulsory' },
			{ value: 'elective', label: 'Elective' },
		],
	},
	{
		id: 'course-semester',
		name: 'semester',
		label: 'Semester',
		type: 'select',
		placeholder: 'Select semester',
		colSpan: 1,
		options: [
			{ value: 'first', label: 'First Semester' },
			{ value: 'second', label: 'Second Semester' },
		],
	},
	{
		id: 'course-description',
		name: 'description',
		label: 'Description',
		type: 'text',
		placeholder: 'Brief course description (optional)',
		colSpan: 2,
	},
];
