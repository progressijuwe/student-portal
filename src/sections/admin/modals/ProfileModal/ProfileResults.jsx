import ResultsTable from "../../../student/results/ResultsTable"
import AcademicSession from '../../../student/results/AcademicSession'

export default function ProfileResults() {
    return (
        <div className="flex flex-col gap-6 px-4">
            <AcademicSession />
            <ResultsTable />
        </div>
    )
}