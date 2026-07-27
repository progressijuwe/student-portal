import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../../styles/calendar.css';
import { useTimetable } from '../../../hooks/student/useTimetable';

const DAY_TO_NUMBER = {
	sunday: 0,
	monday: 1,
	tuesday: 2,
	wednesday: 3,
	thursday: 4,
	friday: 5,
	saturday: 6,
};

function buildEvents(timetableData) {
	if (!timetableData?.timetable || !timetableData?.session) return [];

	const { session, timetable } = timetableData;
	const events = [];

	for (const [day, slots] of Object.entries(timetable)) {
		for (const slot of slots) {
			const semester = slot.course_offering?.semester;
			const startRecur =
				semester === 'first'
					? session.first_semester_start
					: session.second_semester_start;
			const endRecur =
				semester === 'first'
					? session.first_semester_end
					: session.second_semester_end;

			if (!startRecur || !endRecur) continue; // skip if session dates missing

			events.push({
				title: slot.course_offering?.course?.code ?? 'Class',
				startTime: slot.start_time,
				endTime: slot.end_time,
				daysOfWeek: [DAY_TO_NUMBER[day]],
				startRecur,
				endRecur,
			});
		}
	}

	return events;
}

export default function ClassCalendar() {
	const { data: timetableData, isLoading, isError } = useTimetable();
	const classes = buildEvents(timetableData);

	return (
		<div className='bg-white border border-brand-orange rounded-[20px] p-4 flex flex-col gap-4 w-full lg:w-1/3 min-w-0 h-fit'>
			<div className='flex justify-between items-center'>
				<h3 className='text-sm font-medium text-black'>Calendar</h3>
				<button className='text-[10px] font-semibold text-brand-red'>
					View Timetable
				</button>
			</div>
			{isLoading ? (
				<p className='text-sm text-label px-2'>Loading...</p>
			) : isError ? (
				<p className='text-sm text-red-500 px-2'>
					Couldn't load timetable.
				</p>
			) : (
				<FullCalendar
					plugins={[dayGridPlugin]}
					initialView='dayGridMonth'
					headerToolbar={{
						left: 'prev',
						center: 'title',
						right: 'next',
					}}
					events={classes}
					height={380}
					displayEventTime={false}
					eventDisplay='list-item'
					dayMaxEvents={false}
					expandRows={false}
					eventContent={() => (
						<span className='block w-1.5 h-1.5 rounded-full bg-brand-orange' />
					)}
					eventClassNames={({ event, view }) => {
						const eventMonth = event.start.getMonth();
						const viewMonth = view.currentStart.getMonth();
						return eventMonth !== viewMonth ? ['event-faded'] : [];
					}}
				/>
			)}
		</div>
	);
}
