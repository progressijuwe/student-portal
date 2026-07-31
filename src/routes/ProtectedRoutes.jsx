import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import PageFallback from '../components/ui/PageFallback';

const ROLE_DASHBOARDS = {
	student: '/student/dashboard',
	lecturer: '/lecturer/dashboard',
	admin: '/admin/dashboard',
};

/**
 * Route guard.
 *
 * This is a UX control, not a security boundary: the role it reads comes from
 * the client. Every endpoint is independently authorized server-side by role
 * middleware and policies — this only decides what to render.
 */
export default function ProtectedRoute({ allowedRoles = [] }) {
	const { user, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return <PageFallback />;
	}

	if (!user) {
		// Remember where they were headed so login can return them there.
		return <Navigate to='/login' replace state={{ from: location }} />;
	}

	if (!allowedRoles.includes(user.role)) {
		return <Navigate to={ROLE_DASHBOARDS[user.role] ?? '/login'} replace />;
	}

	return <Outlet />;
}
