import Card from '../../../components/ui/Card';
import TimelineIcon from '../../../assets/svg/timeline.svg?react';
import BadgeIcon from '../../../assets/svg/badge.svg?react';
import CalendarIcon from '../../../assets/svg/calendar.svg?react';
import PeopleIcon from '../../../assets/svg/people.svg?react';
import { useStudentDashboard } from '../../../hooks/student/useStudentDashboard';
import { useTimetable } from '../../../hooks/student/useTimetable';
import { getNextClass } from '../../../utils/getNextClass';

// ── hardcoded until this is made configurable per department ──
const TOTAL_CREDITS_REQUIRED = 140;
// ──────────────────────────

export default function StatCards() {
	const { data: dashboard, isLoading, isError } = useStudentDashboard();
	const { data: timetableData } = useTimetable();

	const nextClass = timetableData?.timetable
		? getNextClass(timetableData.timetable)
		: null;

	if (isLoading) {
		return (
			<div className='grid grid-cols-2 lg:grid-cols-4 gap-5'>
				{[1, 2, 3, 4].map((i) => (
					<div
						key={i}
						className='h-32 rounded-2xl bg-brand animate-pulse'
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

	const creditsTaken = dashboard.cumulative_credit_units ?? 0;
	const creditsPercent = Math.round(
		(creditsTaken / TOTAL_CREDITS_REQUIRED) * 100,
	);

	const stats = [
		{
			label: 'Grade Point Average',
			icon: <TimelineIcon />,
			value:
				dashboard.second_semester_gpa ??
				dashboard.first_semester_gpa ??
				'0.00',
			suffix: '/4.00',
			variant: 'gpa',
			badge: formatDelta(dashboard.gpa_change),
		},
		{
			label: 'Cumulative Grade Point Average',
			icon: <BadgeIcon />,
			value: dashboard.cgpa ?? '0.00',
			suffix: '/4.00',
			variant: 'gpa',
			badge: formatDelta(dashboard.cgpa_change),
		},
		{
			label: 'Total Credit Units',
			icon: <PeopleIcon />,
			value: creditsTaken,
			suffix: `/${TOTAL_CREDITS_REQUIRED}`,
			percent: creditsPercent,
			variant: 'credits',
			creditsTaken,
			creditsRequired: TOTAL_CREDITS_REQUIRED,
		},
		{
			label: 'Next Class',
			icon: <CalendarIcon />,
			value: nextClass?.code ?? 'None',
			variant: 'next-class',
			course: nextClass?.title ?? 'No upcoming classes',
			time: nextClass?.time ?? '',
		},
	];

	return (
		<div className='grid grid-cols-2 lg:grid-cols-4 gap-5'>
			{stats.map((stat) => (
				<Card key={stat.label} {...stat} {...getCardSlots(stat)} />
			))}
		</div>
	);
}

function formatDelta(change) {
	if (change === null || change === undefined) return null;
	const sign = change > 0 ? '+' : '';
	return `${sign}${change.toFixed(2)} pts`;
}

function getCardSlots(stat) {
	switch (stat.variant) {
		case 'gpa':
			return {
				footer: (
					<div className='flex items-center gap-2 justify-between'>
						<span className='text-xs text-label font-medium'>
							compared to last semester
						</span>
						{stat.badge && <Badge>{stat.badge}</Badge>}
					</div>
				),
			};
		case 'credits':
			return {
				footer: (
					<span className='text-xs text-label font-medium'>
						{stat.creditsTaken} of {stat.creditsRequired} credits
						completed
					</span>
				),
			};
		case 'next-class':
			return {
				footer: (
					<span className='text-xs text-label font-medium'>
						{stat.course}
						{stat.time ? ` - ${stat.time}` : ''}
					</span>
				),
			};
	}
}

function Badge({ children }) {
	return (
		<span className='text-[8px] md:text-[10px] font-medium border border-badge-border bg-badge text-badge-border px-1.25 py-0.75 rounded-[20px] text-nowrap'>
			{children}
		</span>
	);
}
