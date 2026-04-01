import CoursePane from "../../sections/lecturer/courses/CoursePane";
import CourseSelect from "../../sections/lecturer/courses/CourseSelect";


export default function LecturerCoursesPage(){

    return(
        <div className="px-5 py-8 flex flex-col gap-6">
            <CourseSelect />
            <CoursePane />
        </div>
    )
}