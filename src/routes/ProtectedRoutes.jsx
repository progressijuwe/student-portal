import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ROLE_DASHBOARDS = {
	student: '/student/dashboard',
	lecturer: '/lecturer/dashboard',
	admin: '/admin/dashboard',
};

export default function ProtectedRoute({ allowedRoles = [] }) {
	const { user, loading } = useAuth();

	if (loading) return <p>Loading...</p>;

	if (!user) {
		return <Navigate to='/login' replace />;
	}

	if (!allowedRoles.includes(user.role)) {
		return <Navigate to={ROLE_DASHBOARDS[user.role] ?? '/login'} replace />;
	}

	return <Outlet />;
}
