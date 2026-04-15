import StudentRow from "./components/StudentRow"
import StudentCard from "./components/StudentCard"
import EmptyState from "../../../components/ui/EmptyState"
import StudentTableSkeleton from "./components/StudentTableSkeleton"
import ErrorState from '../../../components/ui/ErrorState'

export default function StudentTable({ students = [], loading = false, error = null, onRetry, onDeleteStudent }) {

    if (loading) {
        return <StudentTableSkeleton />
    }
    if (error) {
        return (
            <ErrorState
                title="Failed to load students"
                description="Something went wrong while fetching students."
                onRetry={onRetry}
            />
        )
    }
    if (!students.length) {
        return (
            <EmptyState
                title="No students found"
                description="Students will appear here once they are added."
            />
        )
    }

    return (
        <section 
            className="w-full"
            aria-labelledby="students-table-heading"
        >
            <h2 id="students-table-heading" className="sr-only">
                Students list
            </h2>
            <div className="hidden lg:block w-full overflow-x-auto">
                <table className="w-full border border-border rounded-[10px] overflow-hidden">
                    <caption className="sr-only">
                        List of students with their details
                    </caption>
                    <thead className="bg-[#F9F9FF] text-left text-sm text-label">
                        <tr>
                            <th scope="col" className="py-3 px-2 font-medium">Student ID</th>
                            <th scope="col" className="py-3 px-2 font-medium">Name</th>
                            <th scope="col" className="py-3 px-2 font-medium">Contact</th>
                            <th scope="col" className="py-3 px-2 font-medium">Department</th>
                            <th scope="col" className="py-3 px-2 font-medium">Level</th>
                            <th scope="col" className="py-3 px-2 font-medium text-nowrap">Date Registered</th>
                            <th scope="col" className="py-3 px-2 font-medium text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map((student) => (
                            <StudentRow key={student.id} student={student} onDeleteStudent={onDeleteStudent} />
                        ))}
                    </tbody>

                </table>
            </div>

            <div className="flex flex-col gap-4 px-6 lg:hidden">
                {students.map((student) => (
                    <StudentCard key={student.id} student={student} />
                ))}
            </div>
        </section>
    )
}