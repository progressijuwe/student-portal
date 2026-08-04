import Map from '../../../assets/images/map.jpg';

/**
 * The venue card beside the day's timetable.
 *
 * The map stays a static image: there is no Google Maps key configured yet, so
 * `ClassLocation` (which draws a live walking route) cannot be used. Every
 * other field now comes from the slot being shown.
 *
 * It previously hardcoded a walking time of "17 mins", a navigation link to an
 * unrelated place, and a fallback venue of "NMI Building | Lecture Hall 3" —
 * which is what the card displayed for the rest of the day once the last class
 * had started, while the class listed beside it named a different room.
 */
export default function ClassPlaceholder({ room, building, isNext = true }) {
	const venue = [building, room].filter(Boolean).join(' | ');

	// Only offer directions somewhere we can actually name.
	const navUrl = venue
		? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
				`${building ?? room}, Abuja, Nigeria`,
			)}&travelmode=walking`
		: null;

	return (
		<div className='flex flex-col w-full max-w-md border border-[#6161613B] rounded-[10px]'>
			<img
				src={Map}
				alt=''
				className='h-70.5 md:h-92 w-full object-cover rounded-[10px]'
			/>
			<div className='py-4 px-6 flex flex-col gap-1'>
				<div className='flex justify-between items-center'>
					<p className='text-xs text-label font-medium'>
						{isNext ? 'Next Class Location' : 'Class Location'}
					</p>

					{navUrl && (
						<a
							href={navUrl}
							target='_blank'
							rel='noreferrer'
							className='text-xs text-brand-orange font-semibold'
						>
							Nav Link
						</a>
					)}
				</div>
				<span className='font-semibold text-xl text-black'>
					{venue || 'Venue to be confirmed'}
				</span>
			</div>
		</div>
	);
}
