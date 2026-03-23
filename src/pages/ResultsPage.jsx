import PageHeading from "../components/ui/PageHeading";
import AcademicSession from "../sections/results/AcademicSession";
import ResultsButtons from "../sections/results/ResultsButtons";
import ResultsTable from "../sections/results/ResultsTable";

export default function ResultsPage(){

    return(
        <div className="py-5 px-6 flex flex-col gap-5">
            <div className="flex flex-col gap-5">
                <PageHeading title="Academic Results" description="Software Engineering Bsc Class of ‘26" />
                <div className="flex items-center justify-between">
                    <AcademicSession />
                    <ResultsButtons className="hidden lg:flex" />
                </div>
            </div>
            <ResultsTable />
        </div>
    )
}