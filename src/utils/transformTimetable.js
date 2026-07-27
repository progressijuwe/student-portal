const DAY_LABELS = {
	monday: 'Monday',
	tuesday: 'Tuesday',
	wednesday: 'Wednesday',
	thursday: 'Thursday',
	friday: 'Friday',
};

export function transformTimetable(timetableByDay) {
	if (!timetableByDay) return [];

	const flattened = [];

	for (const [dayKey, slots] of Object.entries(timetableByDay)) {
		const dayLabel = DAY_LABELS[dayKey];
		if (!dayLabel) continue; // skip weekends if ever present

		for (const slot of slots) {
			flattened.push({
				day: dayLabel,
				startTime: formatTime(slot.start_time),
				endTime: formatTime(slot.end_time),
				name: slot.course_offering?.course?.title,
				code: slot.course_offering?.course?.code,
				lecturer: slot.course_offering?.lecturer?.name,
				room: slot.venue?.name,
				building: slot.venue?.building,
			});
		}
	}

	return flattened;
}

function formatTime(time24) {
	// "09:00:00" -> "9:00"
	const [h, m] = time24.split(':');
	return `${parseInt(h, 10)}:${m}`;
}
