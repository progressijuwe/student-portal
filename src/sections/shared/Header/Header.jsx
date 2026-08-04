import { useAuth } from '../../../context/useAuth';
import Settings from '../../../assets/svg/settings.svg?react';
import Hamburger from '../../../assets/svg/hamburger.svg?react';
import NotificationBell from '../../../components/ui/NotificationBell';
import Logo from '../../../assets/images/portal-logo.png';
import { Roles } from '../../../constants/roles';
import { formatLevel } from '../../../utils/formatLevel';
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

	// Joined from the parts that are actually present. The level comes from the
	// profile, which the first paint may not have yet — interpolating it
	// directly left the subtitle reading ", Software Engineering".
	const subtitle = isStudent
		? [formatLevel(user?.level), user?.department?.name]
				.filter(Boolean)
				.join(', ')
		: isLecturer
			? ['Lecturer', user?.department?.name].filter(Boolean).join(', ')
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
				<div className='lg:hidden flex flex-col text-black'>
					<NotificationBell />
				</div>
			</div>

			<div className='hidden lg:flex items-center gap-6'>
				<button type='button' aria-label='Settings' disabled>
					<Settings />
				</button>

				<NotificationBell />
			</div>
		</header>
	);
}
