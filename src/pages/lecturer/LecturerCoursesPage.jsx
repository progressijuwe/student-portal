import EmptyState from "../../components/ui/EmptyState";
import CoursePane from "../../sections/lecturer/courses/CoursePane";
import CourseSelect from "../../sections/lecturer/courses/CourseSelect";
import CourseStudents from "../../sections/lecturer/courses/CourseStudents";
import { useState } from "react"

const courses = [
  { label: 'SEN 401 - Software Engineering Security',  code: 'SEN 401', title: 'Software Engineering Security',  submittedCount: 7, approvedCount: 6 },
  { label: 'SEN 403 - Database Management Systems',    code: 'SEN 403', title: 'Database Management Systems',    submittedCount: 5, approvedCount: 5 },
  { label: 'SEN 301 - Data Structures and Algorithms', code: 'SEN 301', title: 'Data Structures and Algorithms', submittedCount: 3, approvedCount: 2 },
]

export default function LecturerCoursesPage(){
    const [selectedCourse, setSelectedCourse] = useState(courses[0] || null)
    
    if (!courses.length) {
        return (
            <EmptyState 
                title="No courses found"
                description="Courses will appear here once assigned."
            />
        )
    }

    return(
        <div className="px-5 py-8 flex flex-col gap-6">
            <CourseSelect options={courses} value={selectedCourse} onSelect={setSelectedCourse} />
            <CoursePane />
            <CourseStudents />
        </div>
    )
}