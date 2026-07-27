const DAY_ORDER = [
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
	'sunday',
];

export function getNextClass(timetableByDay) {
	const now = new Date();
	const currentDayIndex = DAY_ORDER.indexOf(
		now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase(),
	);
	const currentTime = now.toTimeString().slice(0, 5);

	const orderedDays = [
		...DAY_ORDER.slice(currentDayIndex),
		...DAY_ORDER.slice(0, currentDayIndex),
	];

	for (const day of orderedDays) {
		const slots = timetableByDay[day];
		if (!slots || slots.length === 0) continue;

		const sorted = [...slots].sort((a, b) =>
			a.start_time.localeCompare(b.start_time),
		);

		for (const slot of sorted) {
			const isToday = day === orderedDays[0];
			if (isToday && slot.start_time <= currentTime) continue;

			return {
				code: slot.course_offering?.course?.code,
				title: slot.course_offering?.course?.title,
				time: formatTime(slot.start_time),
			};
		}
	}

	return null;
}

function formatTime(time24) {
	const [h, m] = time24.split(':').map(Number);
	const period = h >= 12 ? 'pm' : 'am';
	const hour12 = h % 12 || 12;
	return `${hour12}:${String(m).padStart(2, '0')}${period}`;
}
