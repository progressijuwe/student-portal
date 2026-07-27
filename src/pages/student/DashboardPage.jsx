import ClassCalendar from '../../sections/student/dashboard/ClassCalendar';
import Enrolled from '../../sections/student/dashboard/Enrolled';
import GpaChart from '../../sections/student/dashboard/GpaChart';
import StatCards from '../../sections/student/dashboard/StatCards';
import { useStudentDashboard } from '../../hooks/student/useStudentDashboard';

export default function DashboardPage() {
	const { data: dashboard } = useStudentDashboard();

	const firstName = dashboard?.student?.name?.split(' ')[0] ?? '';

	return (
		<div className='py-5 px-6 md:px-8 flex flex-col gap-6'>
			<h2 className='font-semibold text-xl md:text-3xl'>
				Hello{firstName ? `, ${firstName}` : ''}.
			</h2>
			<div className='flex flex-col gap-8'>
				<StatCards />
				<div className='flex flex-col lg:flex-row gap-6 w-full'>
					<GpaChart />
					<ClassCalendar />
				</div>
				<Enrolled />
			</div>
		</div>
	);
}
