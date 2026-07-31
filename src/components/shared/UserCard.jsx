import EmailIcon from '../../assets/svg/email.svg?react';
import PhoneIcon from '../../assets/svg/phone.svg?react';
import DeptIcon from '../../assets/svg/deptIcon.svg?react';
import CalendarIcon from '../../assets/svg/calendar.svg?react';

export default function UserCard({ user, onView, onEdit, onDelete }) {
	const {
		id,
		name,
		displayName,
		email,
		phone,
		department,
		level,
		enrollmentYear,
		joinYear,
		courses,
	} = user;

	const levelOrCourseLoad = level ?? courses?.length;
	const year = enrollmentYear ?? joinYear;
	// Lecturers carry a titled displayName; students only have a plain name.
	const heading = displayName ?? name;

	return (
		<article
			className='border border-border rounded-[10px] p-4 flex flex-col gap-5 bg-white'
			aria-labelledby={`user-${id}`}
		>
			<header className='flex flex-col gap-1'>
				<h3
					id={`user-${id}`}
					className='font-medium text-brand-orange text-sm'
				>
					{heading}
				</h3>
				<p className='text-xs font-medium text-label'>{id}</p>
			</header>

			<ul className='text-xs flex flex-col gap-3'>
				<DetailItem icon={EmailIcon} label='Email'>
					{email}
				</DetailItem>
				<DetailItem icon={PhoneIcon} label='Phone'>
					{phone}
				</DetailItem>
				<DetailItem icon={DeptIcon} label='Department'>
					{department}
					{levelOrCourseLoad &&
						` | ${levelOrCourseLoad} ${level ? 'level' : 'courses'}`}
				</DetailItem>
				<DetailItem
					icon={CalendarIcon}
					label='Year'
					iconClass='[&_path]:fill-label'
				>
					{year}
				</DetailItem>
			</ul>

			<div className='flex gap-2'>
				<ActionButton
					onClick={() => onView?.(user)}
					label={`View ${name}`}
				>
					View
				</ActionButton>
				<ActionButton
					onClick={() => onEdit?.(user)}
					label={`Edit ${name}`}
				>
					Edit
				</ActionButton>
				<ActionButton
					onClick={() => onDelete?.(user)}
					variant='danger'
					label={`Delete ${name}`}
				>
					Delete
				</ActionButton>
			</div>
		</article>
	);
}

function DetailItem({ icon: Icon, children, label, iconClass = '' }) {
	return (
		<li className='flex gap-2 items-start'>
			<Icon
				className={`size-4 shrink-0 ${iconClass}`}
				aria-hidden='true'
			/>
			<span>
				<span className='sr-only'>{label}: </span>
				{children}
			</span>
		</li>
	);
}

function ActionButton({ children, onClick, variant = 'default', label }) {
	const base =
		'px-3 py-1 rounded text-xs border transition focus:outline-none focus:ring-2 focus:ring-offset-1';
	const styles = {
		default: 'border-border hover:bg-gray-50 focus:ring-gray-300',
		danger: 'border-red-500 text-red-500 hover:bg-red-50 focus:ring-red-300',
	};

	return (
		<button
			type='button'
			onClick={onClick}
			aria-label={label}
			className={`${base} ${styles[variant]}`}
		>
			{children}
		</button>
	);
}
