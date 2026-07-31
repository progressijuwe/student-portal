import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../../styles/calendar.css';

export default function AdminCalendar() {
	return (
		<section
			aria-labelledby='admin-calendar-heading'
			className='flex flex-col gap-9 lg:gap-8 bg-white border border-border rounded-[10px] p-6 w-full lg:max-w-66'
		>
			<h2 id='admin-calendar-heading' className='text-base font-semibold'>
				Calendar
			</h2>
			<FullCalendar
				plugins={[dayGridPlugin]}
				initialView='dayGridMonth'
				headerToolbar={{
					left: 'prev',
					center: 'title',
					right: 'next',
				}}
				height={350}
				dayMaxEvents={false}
				events={[]}
				eventDisplay='none'
			/>
		</section>
	);
}
