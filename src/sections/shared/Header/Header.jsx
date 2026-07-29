import { useAuth } from '../../../context/AuthContext';
import Settings from '../../../assets/svg/settings.svg?react';
import Notifs from '../../../assets/svg/notification-bell.svg?react';
import Hamburger from '../../../assets/svg/hamburger.svg?react';
import Logo from '../../../assets/images/portal-logo.png';
import { Roles } from '../../../constants/roles';
import { getLevel } from '../../../utils/getLevel';
import Avatar from '../../../components/ui/Avatar';

export function Header({ onMenuClick }) {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<header className='border-b border-border px-6 py-4'>
				<p className='text-sm text-label'>Loading...</p>
			</header>
		);
	}

	const role = user?.role;

	const isStudent = role === Roles.STUDENT;
	const isLecturer = role === Roles.LECTURER;
	const isAdmin = role === Roles.ADMIN;

	const displayName = isAdmin
		? 'Admin User'
		: isLecturer
			? (user?.lecturer_profile?.display_name ?? user?.name)
			: user?.name;

	const profileImage = user?.profile_photo_url;

	const subtitle = isStudent
		? `${getLevel(user?.entry_year)}, ${user?.department?.name || ''}`
		: isLecturer
			? `Lecturer, ${user?.department?.name || ''}`
			: '';

	return (
		<header className='border-b border-border px-6 py-4 flex gap-11 items-center justify-between lg:justify-end'>
			<button
				onClick={onMenuClick}
				className='lg:hidden'
				aria-label='Open menu'
			>
				<Hamburger aria-hidden='true' />
			</button>

			<img
				src={Logo}
				alt='Portal logo'
				className='w-10.5 h-10.5 object-cover lg:hidden'
			/>

			<div className='flex gap-2 items-center'>
				<Avatar src={profileImage} name={displayName} size='sm' />

				<div className='hidden lg:flex flex-col text-black'>
					<p className='font-semibold text-xs'>{displayName}</p>

					{!isAdmin && (
						<p className='text-xs text-label'>{subtitle}</p>
					)}
				</div>
			</div>

			<div className='items-center gap-6 hidden lg:flex'>
				<button type='button' aria-label='Settings'>
					<Settings />
				</button>

				<button type='button' aria-label='Notifications'>
					<Notifs className='w-6 h-6 fill-brand-red' />
				</button>
			</div>
		</header>
	);
}
