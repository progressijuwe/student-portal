export function filterStudents(students, search, filters) {
    if (!Array.isArray(students)) return []

    const s = search.toLowerCase()

    return students.filter((student) => {
        const matchesSearch =
            student.name.toLowerCase().includes(s) ||
            student.email.toLowerCase().includes(s)

        if (!matchesSearch) return false

        if (filters.faculty && student.faculty !== filters.faculty) return false
        if (filters.department && student.department !== filters.department) return false
        if (filters.level && student.level !== filters.level) return false
        if (filters.enrollmentYear && student.enrollmentYear !== filters.enrollmentYear) return false

        return true
    })
}