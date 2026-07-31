export function filterStudents(students, search, filters) {
	const { faculty, department, level, enrollmentYear } = filters;

	return students.filter((student) => {
		const matchesSearch =
			student.name.toLowerCase().includes(search.toLowerCase()) ||
			student.email.toLowerCase().includes(search.toLowerCase());

		const matchesFaculty = !faculty || student.faculty === faculty;
		const matchesDepartment =
			!department || student.department === department;
		const matchesLevel = !level || student.level === level;
		const matchesEnrollment =
			!enrollmentYear || student.enrollmentYear === enrollmentYear;

		return (
			matchesSearch &&
			matchesFaculty &&
			matchesDepartment &&
			matchesLevel &&
			matchesEnrollment
		);
	});
}
