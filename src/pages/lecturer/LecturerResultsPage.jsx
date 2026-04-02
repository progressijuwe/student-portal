import CourseSelect from "../../sections/lecturer/courses/CourseSelect"
import ResultInfo from "../../sections/lecturer/results/ResultInfo"
import { useState } from "react"

const courses = [
  { label: 'SEN 401 - Software Engineering Security',  code: 'SEN 401', title: 'Software Engineering Security',  submittedCount: 7, approvedCount: 6 },
  { label: 'SEN 403 - Database Management Systems',    code: 'SEN 403', title: 'Database Management Systems',    submittedCount: 5, approvedCount: 5 },
  { label: 'SEN 301 - Data Structures and Algorithms', code: 'SEN 301', title: 'Data Structures and Algorithms', submittedCount: 3, approvedCount: 2 },
]

export default function LecturerResultsPage(){
    const [selectedCourse, setSelectedCourse] = useState(courses[0] || null)

    if (!courses.length) {
        return (
            <div className="flex items-center justify-center h-full py-20">
                <p className="text-gray-500 text-sm md:text-base">
                    No Courses Assigned to Check Results
                </p>
            </div>
        )
    }
    return(
        <div className="flex flex-col gap-8 lg:gap-6 px-4 py-8 lg:py-7 lg:px-8">
            <CourseSelect options={courses} value={selectedCourse} onSelect={setSelectedCourse} />
            {selectedCourse && (
                <ResultInfo
                    code={selectedCourse.code}
                    title={selectedCourse.title}
                    submittedCount={selectedCourse.submittedCount}
                    approvedCount={selectedCourse.approvedCount}
                />
            )}
        </div>
    )
}