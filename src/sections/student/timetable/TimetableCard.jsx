import Person from '../../../assets/svg/person.svg?react';
import Location from '../../../assets/svg/location.svg?react';
import Door from '../../../assets/svg/door.svg?react';

export default function TimetableCard({
	name,
	code,
	lecturer,
	room,
	building,
	startTime,
	endTime,
	isNext,
}) {
	const accent = isNext ? 'text-brand-red' : 'text-label';
	const border = isNext ? 'border-brand-red' : 'border-brand-orange';
	const bar = isNext ? 'bg-brand-red' : 'bg-brand-orange';
	const iconClass = isNext
		? '[&>svg_path]:fill-brand-orange'
		: '[&>svg_path]:fill-label';

	return (
		<div className='flex gap-0.5 md:gap-0.75 w-full'>
			<span
				className={`min-w-0.75 md:min-w-1.5 ${bar} rounded-[36px]`}
			></span>
			<div
				className={`flex items-center gap-3 md:gap-10 border ${border} rounded-[10px] py-6 px-5 md:px-8 bg-white w-full`}
			>
				{startTime && endTime && (
					<div className='flex flex-col items-center justify-center font-semibold gap-1.25 md:gap-0.5 max-h-13 border-r-2 border-r-[#61616130] pr-1 md:pr-3 py-1 md:py-0 md:h-fit'>
						<span className={`${accent} text-sm md:text-xl`}>
							{startTime}
						</span>
						<span className='text-[8px] md:text-[10px] text-label text-nowrap'>
							TO {endTime}
						</span>
					</div>
				)}
				<div className='flex flex-col gap-2 w-full'>
					<div className='flex items-center justify-between gap-1 text-sm md:text-xl font-semibold w-full max-w-80 md:max-w-none'>
						{name && <h3>{name}</h3>}
						<span
							className={`min-w-0.75 min-h-5 h-auto ${bar}`}
						></span>
						{code && <p className='text-nowrap'>{code}</p>}
					</div>
					<div className='flex flex-wrap gap-1 w-full justify-between'>
						{lecturer && (
							<span className='flex items-center'>
								<span className={iconClass}>
									<Person />
								</span>
								<p className='text-label text-xs md:text-sm font-medium'>
									{lecturer}
								</p>
							</span>
						)}

						{building && (
							<span className='flex items-center'>
								<span className={iconClass}>
									<Location />
								</span>
								<p className='text-label text-xs md:text-sm font-medium'>
									{building}
								</p>
							</span>
						)}

						{room && (
							<span className='flex md:gap-1 items-center'>
								<span className={iconClass}>
									<Door />
								</span>
								<p className='text-label text-xs md:text-sm font-medium'>
									{room}
								</p>
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
