import PageHeading from '../../components/ui/PageHeading';
import AcademicSession from '../../sections/student/results/AcademicSession';
import ResultsTable from '../../sections/student/results/ResultsTable';
import StudentResultsActions from '../../sections/student/results/StudentResultActions';
import { useSelectedSession } from '../../hooks/useSelectedSession';
import { useGrades } from '../../hooks/student/useGrades';
import { useStudentDashboard } from '../../hooks/student/useStudentDashboard';

const DEGREE_PREFIX = {
	Undergraduate: 'Bsc.',
	Postgraduate: 'Msc.',
};

export default function ResultsPage() {
	const { data: dashboard } = useStudentDashboard();
	// The semester now defaults to whichever one the selected session is
	// actually in, instead of always opening on the first.
	const { sessions, sessionId, setSessionId, semester, setSemester } =
		useSelectedSession();

	const { data, isLoading, isError } = useGrades({ sessionId, semester });

	const selectedSession = sessions.find(
		(s) => String(s.id) === String(sessionId),
	);
	const semesterLabel =
		semester === 'first' ? '1st Semester' : '2nd Semester';

	const degreePrefix = DEGREE_PREFIX[dashboard?.student?.study_type] ?? '';
	const department = dashboard?.student?.department ?? '';

	const description = dashboard
		? `${degreePrefix} ${department}${dashboard?.student?.graduation_year ? ` Class of '${String(dashboard.student.graduation_year).slice(-2)}` : ''}`.trim()
		: 'Loading...';

	return (
		<div className='py-5 px-6 flex flex-col gap-5'>
			<div className='flex flex-col gap-5'>
				<PageHeading
					title='Academic Results'
					description={description}
				/>
				<div className='flex items-center justify-between'>
					<AcademicSession
						sessionId={sessionId}
						onSessionChange={setSessionId}
						semester={semester}
						onSemesterChange={setSemester}
					/>
					<StudentResultsActions className='hidden lg:flex' />
				</div>
			</div>
			<div className='flex flex-col gap-5'>
				<ResultsTable
					sessionLabel={selectedSession?.name}
					semesterLabel={semesterLabel}
					grades={data?.grades}
					isLoading={isLoading}
					isError={isError}
				/>
				<StudentResultsActions className='lg:hidden' />
			</div>
		</div>
	);
}
