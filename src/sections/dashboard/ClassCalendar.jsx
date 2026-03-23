// sections/dashboard/ClassCalendar.jsx
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '../../styles/calendar.css'

// ── replace with API data ──
const semesterStart = '2026-03-03'
const semesterEnd   = '2026-06-28'

const classes = [
  { title: 'SEN 406', startTime: '11:00', endTime: '13:00', daysOfWeek: [1, 3], startRecur: semesterStart, endRecur: semesterEnd },
  { title: 'SEN 402', startTime: '09:00', endTime: '11:00', daysOfWeek: [1, 4], startRecur: semesterStart, endRecur: semesterEnd },
  { title: 'SEN 404', startTime: '13:00', endTime: '15:00', daysOfWeek: [5],    startRecur: semesterStart, endRecur: semesterEnd },
]
// ──────────────────────────

export default function ClassCalendar() {
    return (
        <div className="bg-white border border-brand-orange rounded-[20px] p-4 flex flex-col gap-4 w-full lg:w-1/3 min-w-0 h-fit">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-black">Calendar</h3>
                <button className="text-[10px] font-semibold text-brand-red">View Timetable</button>
            </div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev',
                    center: 'title',
                    right: 'next',
                }}
                events={classes}
                height={380}
                displayEventTime={false}
                eventDisplay="list-item"
                dayMaxEvents={false}
                expandRows={false}
                eventContent={() => (
                    <span className="block w-1.5 h-1.5 rounded-full bg-brand-orange" />
                )}
                eventClassNames={({ event, view }) => {
                    const eventMonth = event.start.getMonth()
                    const viewMonth = view.currentStart.getMonth()
                    return eventMonth !== viewMonth ? ['event-faded'] : []
                }}
            />
        </div>
    )
}