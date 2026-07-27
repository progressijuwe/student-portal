import PersonIcon from '../../../assets/svg/person.svg?react';

export default function CourseCard({ course, isSelected, onToggle }) {
	const isCompulsory = course.type === 'compulsory';

	return (
		<label
			className={`flex items-start gap-3 p-4 border rounded-[10px] cursor-pointer transition-colors ${
				isSelected
					? 'border-brand-orange bg-orange-50'
					: 'border-border bg-white hover:border-gray-300'
			}`}
		>
			<input
				type='checkbox'
				checked={isSelected}
				onChange={() => onToggle(course)}
				className='mt-1 accent-brand-red shrink-0'
				aria-label={`Select ${course.title}`}
			/>
			<div className='flex flex-col gap-1 w-full min-w-0'>
				<div className='flex items-center justify-between gap-2 flex-wrap'>
					<div className='flex items-center gap-2'>
						<span className='text-xs font-semibold text-brand-red'>
							{course.code}
						</span>
						<span
							className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
								isCompulsory
									? 'bg-red-100 text-red-600'
									: 'bg-blue-100 text-blue-600'
							}`}
						>
							{isCompulsory ? 'Compulsory' : 'Elective'}
						</span>
					</div>
					<span className='text-xs font-medium text-label shrink-0'>
						{course.units} {course.units === 1 ? 'Unit' : 'Units'}
					</span>
				</div>
				<p className='text-sm font-medium text-black'>{course.title}</p>
				<span className='flex items-center gap-1 text-xs text-label'>
					<PersonIcon
						className='size-3.5 shrink-0 [&_path]:stroke-label'
						aria-hidden='true'
					/>
					{course.lecturer}
				</span>
			</div>
		</label>
	);
}
