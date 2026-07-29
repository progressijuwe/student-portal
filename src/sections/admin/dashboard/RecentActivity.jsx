import { ACTIVITY_CONFIG } from '../../../constants/activityConfig.js';
import ClockIcon from '../../../assets/svg/clock.svg?react';
import { useAdminActivity } from '../../../hooks/admin/useAdminActivity';

function ActivityIcon({ type }) {
	const config = ACTIVITY_CONFIG[type];
	if (!config) return null;
	const { Icon, bg, color } = config;

	return (
		<span
			aria-hidden='true'
			style={{ backgroundColor: bg, '--icon-color': color }}
			className='p-1 lg:p-2 rounded-[5px] lg:rounded-[10px] shrink-0 [&>svg>path]:stroke-(--icon-color) [&>svg]:size-3 lg:[&>svg]:size-6'
		>
			<Icon />
		</span>
	);
}

function ActivityItem({ type, title, meta, label, time }) {
	const cleanMeta = (meta ?? []).filter(Boolean);

	return (
		<li className='flex flex-col lg:flex-row justify-between gap-1.25 lg:gap-4'>
			<div className='flex items-start lg:items-center gap-2.5 lg:gap-10'>
				<ActivityIcon type={type} />
				<div className='flex flex-col gap-2'>
					<p className='text-xs lg:text-sm font-medium text-black'>
						{title}
						{cleanMeta.map((m, i) => (
							<span key={`${m}-${i}`} className='font-normal'>
								<span aria-hidden='true'> | </span>
								{m}
							</span>
						))}
					</p>
					<span className='text-[10px] lg:text-xs font-medium text-label'>
						{label}
					</span>
				</div>
			</div>
			<div className='flex items-center gap-1.5 shrink-0 text-label pl-7'>
				<ClockIcon aria-hidden='true' className='size-3.75 lg:size-4' />
				<span className='text-[10px] lg:text-xs font-medium text-nowrap'>
					{time}
				</span>
			</div>
		</li>
	);
}

export default function RecentActivity() {
	const { data: activities, isLoading, isError } = useAdminActivity();

	return (
		<section
			className='bg-white rounded-[10px] drop-shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1)] flex flex-col gap-5 lg:gap-8 px-6 lg:px-12 py-5 lg:py-8 border border-border w-full'
			aria-labelledby='recent-activity-heading'
		>
			<h2
				id='recent-activity-heading'
				className='text-sm lg:text-base font-semibold text-black'
			>
				Recent Activity
			</h2>
			{isLoading ? (
				<p className='text-sm text-label py-6 text-center'>
					Loading...
				</p>
			) : isError ? (
				<p className='text-sm text-red-500 py-6 text-center'>
					Couldn't load recent activity.
				</p>
			) : !activities?.length ? (
				<p className='text-sm text-label py-6 text-center'>
					No recent activity
				</p>
			) : (
				<ul className='flex flex-col gap-4'>
					{activities.map((activity) => (
						<ActivityItem key={activity.id} {...activity} />
					))}
				</ul>
			)}
		</section>
	);
}
