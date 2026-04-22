import CourseSelect from "../../sections/lecturer/courses/CourseSelect"
import ResultInfo from "../../sections/lecturer/results/ResultInfo"
import ResultTable from "../../sections/lecturer/results/ResultTable"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import StudentSearch from "../../sections/lecturer/results/StudentSearch"
import { useMemo } from "react"
import EmptyState from "../../components/ui/EmptyState"


const courses = [
  { label: 'SEN 401 - Software Engineering Security',  code: 'SEN 401', title: 'Software Engineering Security',  submittedCount: 7, approvedCount: 6 },
  { label: 'SEN 403 - Database Management Systems',    code: 'SEN 403', title: 'Database Management Systems',    submittedCount: 5, approvedCount: 5 },
  { label: 'SEN 301 - Data Structures and Algorithms', code: 'SEN 301', title: 'Data Structures and Algorithms', submittedCount: 3, approvedCount: 2 },
]
const students = [
  { matric: "SOF/22U/10098", name: "Stephanie Zikora Obi",       dept: "Software Engineering" },
  { matric: "SOF/22U/10039", name: "Adebayo Oluwaseun Johnson",   dept: "Software Engineering" },
  { matric: "SOF/22U/10040", name: "Ibrahim Kazeem Olalekan",     dept: "Software Engineering" },
  { matric: "SOF/22U/10041", name: "Fatimah Adeola Bakare",       dept: "Software Engineering" },
  { matric: "SOF/22U/10042", name: "Chinedu Emeka Okafor",        dept: "Software Engineering" },
  { matric: "SOF/22U/10043", name: "Zainab Aminat Yusuf",         dept: "Software Engineering" },
  { matric: "SOF/22U/10044", name: "Emmanuel Tunde Adebayo",      dept: "Software Engineering" },
  { matric: "SOF/22U/10045", name: "Ngozi Chiamaka Nwosu",        dept: "Software Engineering" },
  { matric: "SOF/22U/10046", name: "Olufemi Michael Akinola",     dept: "Software Engineering" },
  { matric: "SOF/22U/10047", name: "Amina Yusuf Bello",           dept: "Software Engineering" },
  { matric: "SOF/22U/10048", name: "Tunde Stephen Adewale",       dept: "Software Engineering" },
  { matric: "SOF/22U/10049", name: "Halima Sani Abdullahi",       dept: "Software Engineering" },
  { matric: "SOF/22U/10050", name: "Babatunde Samuel Ojo",        dept: "Software Engineering" },
  { matric: "SOF/22U/10051", name: "Marisama Bintou Diallo",      dept: "Software Engineering" },
]

export default function LecturerResultsPage(){
    const [selectedCourse, setSelectedCourse] = useState(courses[0] || null)

    const [studentsData, setStudentsData] = useState(
        students.map((s) => ({
            ...s,
            ca: "",
            project: "",
            exam: "",
            total: 0,
            grade: "",
            status: "Draft",
        }))
    )


    const [searchTerm, setSearchTerm] = useState("")

    const filteredStudents = useMemo(() => {
        const term = searchTerm.toLowerCase()
        return studentsData.filter((student) =>
            student.name.toLowerCase().includes(term) ||
            student.matric.toLowerCase().includes(term)
        )
    }, [studentsData, searchTerm])

    if (!courses.length) {
        return (
            <EmptyState
                title="No Results found"
                description="Results will appear here once courses are available."
            />
        )
    }
    return(
        <div className="flex flex-col gap-8 lg:gap-6 px-4 py-8 lg:py-7 lg:px-8">
            <CourseSelect options={courses} value={selectedCourse} onSelect={setSelectedCourse} />
            {selectedCourse && (
                <ResultInfo {...selectedCourse}/>
            )}
            <StudentSearch onSearch={setSearchTerm} />
            <ResultTable 
                data={filteredStudents}
                setData={setStudentsData} 
            />
        </div>
    )
}