import { useUserSummary } from '../../../../hooks/admin/useUserSummary';

const STATS_CONFIG = {
	primary: {
		bg: 'bg-brand-blue',
		textColor: 'text-brand-blue-border',
		borderColor: 'border-brand-blue-border',
	},
	secondary: {
		bg: 'bg-[#D2FFE2]',
		textColor: 'text-[#016630]',
		borderColor: 'border-[#016630]',
	},
	tertiary: {
		bg: 'bg-[#FFE4E4]',
		textColor: 'text-brand-red',
		borderColor: 'border-brand-red',
	},
	quaternary: {
		bg: 'bg-[#F3E8FF]',
		textColor: 'text-[#9810FA]',
		borderColor: 'border-[#9810FA]',
	},
};

export default function ProfileStats({ user }) {
	const isStudent = 'level' in user;
	const { data: summary, isLoading } = useUserSummary(user?.rawId);

	if (!user) return null;

	if (isLoading || !summary) {
		return (
			<div className='grid grid-cols-2 lg:grid-cols-4 gap-3 px-4'>
				{[1, 2, 3, 4].map((i) => (
					<div
						key={i}
						className='h-20 rounded-[5px] bg-gray-100 animate-pulse'
					/>
				))}
			</div>
		);
	}

	const stats = isStudent
		? [
				{
					key: 'primary',
					label: 'Total Credits',
					value: summary.total_credits,
				},
				{
					key: 'secondary',
					label: 'Passed Courses',
					value: summary.passed_courses,
				},
				{
					key: 'tertiary',
					label: 'Failed Courses',
					value: summary.failed_courses,
				},
				{ key: 'quaternary', label: 'CGPA', value: summary.cgpa },
			]
		: [
				{
					key: 'primary',
					label: 'Department',
					value: summary.department_code,
				},
				{
					key: 'secondary',
					label: 'Courses',
					value: summary.total_courses,
				},
				{
					key: 'tertiary',
					label: 'Students',
					value: summary.total_students,
				},
				{
					key: 'quaternary',
					label: 'Avg. Students',
					value: summary.average_students,
				},
			];

	return (
		<div className='grid grid-cols-2 lg:grid-cols-4 gap-3 px-4'>
			{stats.map((stat) => {
				const config = STATS_CONFIG[stat.key];
				return (
					<div
						key={stat.key}
						className={`flex flex-col gap-0.75 shrink border rounded-[5px] py-3 px-8 text-center ${config.bg} ${config.borderColor}`}
					>
						<p
							className={`text-[30px] font-semibold ${config.textColor}`}
						>
							{stat.value}
						</p>
						<p className='text-xs'>{stat.label}</p>
					</div>
				);
			})}
		</div>
	);
}
