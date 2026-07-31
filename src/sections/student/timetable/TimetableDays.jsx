const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function TimetableDays({ active, onSelect }) {
	return (
		<div className='flex justify-between w-full border-b border-b-label px-0 md:px-4'>
			{days.map((day) => (
				<button
					key={day}
					onClick={() => onSelect(day)}
					className={`pb-1.5 border-b-2 text-xs md:text-sm font-medium cursor-pointer transition-colors
            ${
				active === day
					? 'border-brand-orange text-brand-orange'
					: 'border-transparent text-label'
			}`}
				>
					{day}
				</button>
			))}
		</div>
	);
}
