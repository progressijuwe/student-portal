import EnrolledIcon from '../../assets/svg/people.svg?react';
import BookIcon from '../../assets/svg/courses.svg?react';

const cardColors = [
	'linear-gradient(90.2deg, #940002 0.15%, #FF0000 99.81%)',
	'linear-gradient(90.2deg, #002083 0.15%, #1447E6 99.81%)',
	'linear-gradient(90.2deg, #40006E 0.15%, #9400FF 99.81%)',
	'linear-gradient(89.72deg, #003F17 0.25%, #00FF5F 99.78%)',
	'linear-gradient(90.2deg, #3D0025 0.15%, #FF0099 99.81%)',
];

/**
 * Keyed on the course code so a course keeps the same colour across reloads,
 * pages and filters. Keying on the primary key made the colour depend on
 * insertion order, which is meaningless to the person looking at the card.
 */
const getColor = (code = '') => {
	const str = String(code);
	const sum = [...str].reduce((total, char) => total + char.charCodeAt(0), 0);
	return cardColors[sum % cardColors.length];
};

const SEMESTER_LABELS = {
	first: 'First',
	second: 'Second',
};

const getInitials = (name = '') =>
	name
		.trim()
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((word) => word[0])
		.join('')
		.toUpperCase();

export default function CourseCard({ course, onEdit, onDelete }) {
	// Field names follow the API's CourseResource. This component was written
	// against the old fixture shape, where `id` held the course code and the
	// unit count was called `units` — so it rendered the primary key as the
	// course code and "undefined Units" once it was wired to the real endpoint.
	const {
		code,
		title,
		semester,
		credit_units: creditUnits,
		level,
		lecturer,
		enrolled,
	} = course;

	const cardColor = getColor(code);
	const initials = getInitials(lecturer?.name ?? '');

	return (
		<article className='border border-border rounded-xl overflow-hidden flex flex-col'>
			{/* Colored header */}
			<div
				className='pt-4 pb-3 px-5.5 flex justify-between items-start h-31 rounded-xl'
				style={{ backgroundImage: cardColor }}
			>
				<div className='flex flex-col gap-3 h-full justify-between'>
					<div className='flex flex-col gap-3'>
						<div className='flex items-center gap-2.25'>
							<span className='text-white font-semibold text-sm'>
								{code}
							</span>
							<span className='text-xs font-semibold bg-white/24 text-white px-1.5 py-0.5 rounded-xl'>
								{SEMESTER_LABELS[semester] ?? semester} Semester
							</span>
						</div>
						<h3 className='text-white font-semibold text-base leading-4.75'>
							{title}
						</h3>
					</div>

					<div className='flex items-center gap-3 text-white/80 text-xs mt-1'>
						<span className='flex items-center gap-1'>
							<EnrolledIcon
								className='size-3.5 [&_path]:stroke-white'
								aria-hidden='true'
							/>
							{creditUnits} Units
						</span>
						<span className='flex items-center gap-1'>
							<BookIcon
								className='size-3.5 [&_path]:stroke-white'
								aria-hidden='true'
							/>
							{level} Level
						</span>
					</div>
				</div>
				<span className='p-2 rounded-[10px] bg-white/20'>
					<BookIcon
						className='size-6 [&_path]:stroke-white'
						aria-hidden='true'
					/>
				</span>
			</div>

			{/* Body */}
			<div className='flex flex-col gap-3 px-2 py-3 bg-white flex-1'>
				<div className='flex items-center gap-4.5 border-b border-border pb-3'>
					<span
						className='p-3 rounded-xl flex items-center justify-center text-white text-sm font-semibold shrink-0'
						style={{ backgroundImage: cardColor }}
					>
						{initials}
					</span>
					<div className='flex flex-col gap-1'>
						<span className='text-xs text-label'>Lecturer</span>
						<span className='text-sm font-medium text-black'>
							{lecturer?.name ?? 'No lecturer assigned'}
						</span>
					</div>
				</div>

				<div className='flex items-center gap-4.5'>
					<span className='p-3 rounded-full bg-blue-100 flex items-center justify-center shrink-0'>
						<EnrolledIcon
							className='size-4 [&_path]:stroke-blue-500'
							aria-hidden='true'
						/>
					</span>
					<div className='flex flex-col'>
						<span className='text-xs text-label'>Enrolled</span>
						<span className='text-sm font-medium text-black'>
							{enrolled ?? 0} Students
						</span>
					</div>
				</div>

				<div className='flex gap-4 pt-3'>
					<button
						type='button'
						onClick={() => onEdit?.(course)}
						className='flex-1 py-1.25 text-sm leading-4.25 font-medium text-label border border-label rounded-xl hover:bg-gray-50 transition'
					>
						Edit
					</button>
					<button
						type='button'
						onClick={() => onDelete?.(course)}
						className='flex-1 py-1.25 text-sm leading-4.25 border border-brand-red text-brand-red rounded-xl hover:bg-red-50 transition'
					>
						Delete
					</button>
				</div>
			</div>
		</article>
	);
}
