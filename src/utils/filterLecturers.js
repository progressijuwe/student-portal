export function filterLecturers(lecturers, search, filters) {
    const { faculty, department, title, qualification, courseLoad, joinYear } = filters

    return lecturers.filter((lecturer) => {
        const matchesSearch =
        lecturer.name.toLowerCase().includes(search.toLowerCase()) ||
        lecturer.email.toLowerCase().includes(search.toLowerCase())

        const matchesFaculty        = !faculty        || lecturer.faculty      === faculty
        const matchesDepartment     = !department     || lecturer.department   === department
        const matchesTitle          = !title          || lecturer.prefix        === title
        const matchesQualification  = !qualification  || lecturer.qualification === qualification
        const matchesCourseLoad     = !courseLoad || (
            courseLoad === "3" 
                ? lecturer.courses.length >= 3 
                : lecturer.courses.length === Number(courseLoad)
            )
        const matchesJoinYear     = !joinYear || lecturer.joinYear === joinYear

        return matchesSearch && matchesFaculty && matchesDepartment && matchesTitle && matchesQualification && matchesCourseLoad && matchesJoinYear
    })
}