import LecturerAssigned from '../../sections/lecturer/dashboard/LecturerAssigned';
import LecturerStatCards from '../../sections/lecturer/dashboard/LecturerStatCards';
import { useAuth } from '../../context/useAuth';

export default function LecturerDashboardPage() {
	const { user } = useAuth();

	const displayName =
		user?.lecturer_profile?.display_name ?? user?.name ?? '';

	return (
		<div className='px-5 md:px-8 py-11 md:py-4 flex flex-col gap-7'>
			<div className='flex flex-col gap-6'>
				<h2 className='text-xl md:text-[30px] text-black font-semibold'>
					Welcome Back{displayName ? `, ${displayName}` : ''}.
				</h2>
				<LecturerStatCards />
			</div>
			<LecturerAssigned />
		</div>
	);
}
