import Course from '../../../assets/svg/course.svg?react';
import Courses from '../../../assets/svg/courses.svg?react';
import LecturerCard from '../../../components/ui/LecturerCard';
import { useLecturerDashboard } from '../../../hooks/lecturer/useLecturerDashboard';

export default function LecturerStatCards() {
	const { data: dashboard, isLoading, isError } = useLecturerDashboard();

	if (isLoading) {
		return (
			<div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-9'>
				{[1, 2, 3, 4].map((i) => (
					<div
						key={i}
						className='h-24 rounded-[10px] bg-brand animate-pulse'
					/>
				))}
			</div>
		);
	}

	if (isError || !dashboard) {
		return (
			<p className='text-sm text-red-500'>
				Couldn't load dashboard stats.
			</p>
		);
	}

	const totalCourses = dashboard.total_courses ?? 0;
	const totalStudents = dashboard.total_students ?? 0;
	const avgClassSize =
		totalCourses > 0 ? Math.round(totalStudents / totalCourses) : 0;

	const stats = [
		{
			label: 'Total Courses',
			icon: <Courses />,
			bgColor: '#FFEDD4',
			color: '#F54900',
			value: totalCourses,
		},
		{
			label: 'Total Students',
			icon: <Course />,
			bgColor: '#DBEAFE',
			color: '#155DFC',
			value: totalStudents,
		},
		{
			label: 'Avg. Class Size',
			icon: <Course />,
			bgColor: '#DCFCE7',
			color: '#00A63E',
			value: avgClassSize,
		},
		{
			label: 'Department',
			icon: <Courses />,
			bgColor: '#F3E8FF',
			color: '#9810FA',
			value: dashboard.lecturer?.department_code ?? '—',
		},
	];
	return (
		<div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-9'>
			{stats.map((stat) => (
				<LecturerCard key={stat.label} {...stat} />
			))}
		</div>
	);
}
