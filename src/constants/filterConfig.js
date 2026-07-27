const currentYear = new Date().getFullYear()

const enrollmentYearOptions = [
    { label: "All years", value: "" },
    ...Array.from({ length: 7 }, (_, i) => {
        const year = currentYear - i
        return { label: String(year), value: String(year) }
    })
]

const joinYearOptions = [
    { label: "All years", value: "" },
    ...Array.from({ length: 7 }, (_, i) => {
        const year = currentYear - i
        return { label: String(year), value: String(year) }
    })
]
const facultyOptions = [
    { label: "All faculties",          value: "" },
    { label: "School of Computing",    value: "School of Computing" },
    { label: "School of Engineering",  value: "School of Engineering" },
    { label: "School of Management",   value: "School of Management" },
]

const departmentOptions = [
    { label: "All departments",          value: "" },
    { label: "Software Engineering",     value: "Software Engineering" },
    { label: "Computer Science",         value: "Computer Science" },
    { label: "Mechanical Engineering",   value: "Mechanical Engineering" },
    { label: "Electrical Engineering",   value: "Electrical Engineering" },
    { label: "Civil Engineering",        value: "Civil Engineering" },
    { label: "Business Administration",  value: "Business Administration" },
    { label: "Accounting",               value: "Accounting" },
]

export const studentFilterFields = [
    {
        name: "faculty",
        label: "Faculty",
        options: facultyOptions,
    },
    {
        name: "department",
        label: "Department",
        options: departmentOptions,
    },
    {
        name: "level",
        label: "Level",
        options: [
        { label: "All levels", value: "" },
        { label: "100", value: "100" },
        { label: "200", value: "200" },
        { label: "300", value: "300" },
        { label: "400", value: "400" },
        ],
    },
    {
        name: "enrollmentYear",
        label: "Enrollment Year",
        options: enrollmentYearOptions,
    },
]

export const lecturerFilterFields = [
    {
        name: "faculty",
        label: "Faculty",
        options: facultyOptions,
    },
    {
        name: "department",
        label: "Department",
        options: departmentOptions,
    },
    {
        name: "title",
        label: "Title",
        options: [
            { label: "All titles", value: "" },
            { label: "Prof.", value: "Prof." },
            { label: "Dr.",   value: "Dr." },
            { label: "Mrs.",  value: "Mrs." },
            { label: "Engr.", value: "Engr." },
        ],
    },
    {
        name: "qualification",
        label: "Qualification",
        options: [
        { label: "All qualifications", value: "" },
        { label: "BSc",  value: "BSc" },
        { label: "MSc",  value: "MSc" },
        { label: "PhD",  value: "PhD" },
        { label: "Prof", value: "Prof" },
        ],
    },
    {
        name: "courseLoad",
        label: "Course Load",
        options: [
        { label: "Any",        value: "" },
        { label: "1 course",   value: "1" },
        { label: "2 courses",  value: "2" },
        { label: "3+ courses", value: "3" },
        ],
    },
    {
        name: "joinYear",
        label: "Year Joined",
        options: joinYearOptions,
    },
]
export const courseFilterFields = [
    {
        name: "semester",
        label: "Semester",
        options: [
        { label: "All semesters",   value: "" },
        { label: "First Semester",  value: "First Semester" },
        { label: "Second Semester", value: "Second Semester" },
        ],
    },
    {
        name: "level",
        label: "Level",
        options: [
        { label: "All levels", value: "" },
        { label: "100", value: "100" },
        { label: "200", value: "200" },
        { label: "300", value: "300" },
        { label: "400", value: "400" },
        { label: "500", value: "500" },
        ],
    },
    {
        name: "department",
        label: "Department",
        options: [
        { label: "All departments",        value: "" },
        { label: "Software Engineering",   value: "Software Engineering" },
        { label: "Computer Science",       value: "Computer Science" },
        { label: "Mechanical Engineering", value: "Mechanical Engineering" },
        { label: "Electrical Engineering", value: "Electrical Engineering" },
        { label: "Civil Engineering",      value: "Civil Engineering" },
        { label: "Business Administration",value: "Business Administration" },
        { label: "Accounting",             value: "Accounting" },
        ],
    },
]