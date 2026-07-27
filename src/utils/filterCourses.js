export function filterCourses(courses, search, filters) {
    const { semester, level, department } = filters

    return courses.filter((course) => {
        const matchesSearch =
            course.title.toLowerCase().includes(search.toLowerCase()) ||
            course.id.toLowerCase().includes(search.toLowerCase()) ||
            course.lecturer.name.toLowerCase().includes(search.toLowerCase())

        const matchesSemester   = !semester   || course.semester   === semester
        const matchesLevel      = !level      || course.level      === level
        const matchesDepartment = !department || course.department === department

        return matchesSearch && matchesSemester && matchesLevel && matchesDepartment
    })
}