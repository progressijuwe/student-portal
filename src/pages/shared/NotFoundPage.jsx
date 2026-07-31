import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

const ROLE_DASHBOARDS = {
	student: '/student/dashboard',
	lecturer: '/lecturer/dashboard',
	admin: '/admin/dashboard',
};

export default function NotFoundPage() {
	const { user } = useAuth();
	const home = ROLE_DASHBOARDS[user?.role] ?? '/login';

	return (
		<main className='flex flex-col items-center justify-center min-h-screen gap-5 px-6 text-center font-body'>
			<p className='text-[64px] font-semibold leading-none text-brand-red'>
				404
			</p>
			<h1 className='text-xl font-semibold text-dark'>Page not found</h1>
			<p className='max-w-md text-sm text-label'>
				The page you're looking for doesn't exist, or you don't have
				access to it.
			</p>
			<Link
				to={home}
				className='px-5 py-2.5 rounded-sm bg-brand-red text-white text-sm font-medium'
			>
				{user ? 'Back to dashboard' : 'Go to sign in'}
			</Link>
		</main>
	);
}
