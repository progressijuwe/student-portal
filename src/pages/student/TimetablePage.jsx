import PageHeading from "../../components/ui/PageHeading";
import TimetableClass from "../../sections/student/timetable/TimetableClass";


export default function TimetablePage(){

    return(
        <div className="px-4 py-5 flex flex-col gap-4">
            <PageHeading title="Academic Timetable" description="1st Semester | Bsc. Software Engineering | 4th Year" />
            <TimetableClass />
        </div>
    )
}