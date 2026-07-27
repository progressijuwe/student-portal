import PageHeading from '../../components/ui/PageHeading';
import TimetableClass from '../../sections/student/timetable/TimetableClass';
import { useStudentDashboard } from '../../hooks/student/useStudentDashboard';
import { useTimetable } from '../../hooks/student/useTimetable';
import { getCurrentSemester } from '../../utils/getCurrentSemester';

const DEGREE_PREFIX = {
	Undergraduate: 'Bsc.',
	Postgraduate: 'Msc.',
};

export default function TimetablePage() {
	const { data: dashboard } = useStudentDashboard();
	const { data: timetableData } = useTimetable();

	const semester = getCurrentSemester(timetableData?.session);
	const degreePrefix = DEGREE_PREFIX[dashboard?.student?.study_type] ?? '';
	const department = dashboard?.student?.department ?? '';
	const level = dashboard?.student?.level ?? '';

	const description = dashboard
		? [semester?.label, `${degreePrefix} ${department}`.trim(), level]
				.filter(Boolean)
				.join(' | ')
		: 'Loading...';

	return (
		<div className='px-4 py-5 flex flex-col gap-4'>
			<PageHeading title='Academic Timetable' description={description} />
			<TimetableClass />
		</div>
	);
}
