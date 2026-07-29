import TotalStudents from '../../../assets/svg/totalStudents.svg?react';
import People from '../../../assets/svg/people.svg?react';
import CourseIcon from '../../../assets/svg/courseIcon.svg?react';
import { useAdminDashboard } from '../../../hooks/admin/useAdminDashboard';

export default function DashboardCards() {
	const { data, isLoading, isError } = useAdminDashboard();

	if (isLoading) {
		return (
			<div
				className='flex shrink-0 w-full gap-5 overflow-x-auto md:overflow-visible'
				style={{ scrollbarWidth: 'none' }}
			>
				{[1, 2, 3].map((i) => (
					<div
						key={i}
						className='h-32 w-full max-w-40.5 sm:max-w-67.5 xl:max-w-70 rounded-[20px] bg-brand animate-pulse'
					/>
				))}
			</div>
		);
	}

	if (isError || !data) {
		return (
			<p className='text-sm text-red-500'>
				Couldn't load dashboard stats.
			</p>
		);
	}

	const details = [
		{
			label: 'Total Students',
			value: data.total_students,
			Icon: TotalStudents,
			color: '#DBEAFE',
		},
		{
			label: 'Total Lecturers',
			value: data.total_lecturers,
			Icon: People,
			color: '#FFEDD4',
		},
		{
			label: 'Total Courses',
			value: data.total_courses,
			Icon: CourseIcon,
			color: '#DCFCE7',
		},
	];

	return (
		<div
			className='flex shrink-0 w-full gap-5 overflow-x-auto md:overflow-visible'
			style={{ scrollbarWidth: 'none' }}
		>
			{details.map((det) => (
				<div
					key={det.label}
					className='flex justify-between gap-2 bg-white rounded-[20px] border border-brand-orange p-4 w-full max-w-40.5 shrink-0 md:shrink sm:max-w-67.5 xl:max-w-65'
				>
					<div className='flex flex-col justify-between gap-5'>
						<p className='text-sm font-medium text-black'>
							{det.label}
						</p>
						<span className='text-[40px] text-brand-red font-medium'>
							{det.value}
						</span>
					</div>
					{det.Icon && (
						<span
							className='h-fit w-fit rounded-[10px] p-1.25 lg:p-2.5'
							style={{ backgroundColor: det.color }}
						>
							<det.Icon className='size-3.75 lg:size-7.5' />
						</span>
					)}
				</div>
			))}
		</div>
	);
}
