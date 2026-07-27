export function filterResults(results, search, filters) {
	const { level, faculty, department } = filters;

	return results.filter((result) => {
		const matchesSearch =
			result.title.toLowerCase().includes(search.toLowerCase()) ||
			result.code.toLowerCase().includes(search.toLowerCase());

		const matchesLevel = !level || result.level === level;
		const matchesFaculty = !faculty || result.faculty === faculty;
		const matchesDepartment = !department || result.department === department;

		return matchesSearch && matchesLevel && matchesFaculty && matchesDepartment;
	});
}
