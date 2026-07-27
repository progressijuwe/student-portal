export function filterRegistrations(registrations, search, filters) {
	const { level, faculty, department } = filters;

	return registrations.filter((reg) => {
		const matchesSearch =
			reg.name.toLowerCase().includes(search.toLowerCase()) ||
			reg.id.toLowerCase().includes(search.toLowerCase());

		const matchesLevel = !level || reg.level === level;
		const matchesFaculty = !faculty || reg.faculty === faculty;
		const matchesDepartment = !department || reg.department === department;

		return matchesSearch && matchesLevel && matchesFaculty && matchesDepartment;
	});
}
