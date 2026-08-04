import { lazy, Suspense } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import PageFallback from '../components/ui/PageFallback';

const ChangePasswordPage = lazy(
	() => import('../pages/shared/ChangePasswordPage'),
);

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

	// Takes precedence over the role check: someone holding a temporary password
	// has no business anywhere in the portal yet, whichever role they hold. The
	// API enforces the same rule, so this is the pleasant version of a 403
	// rather than the thing standing between them and the data.
	if (user.must_change_password) {
		return (
			<Suspense fallback={<PageFallback />}>
				<ChangePasswordPage />
			</Suspense>
		);
	}

	if (!allowedRoles.includes(user.role)) {
		return <Navigate to={ROLE_DASHBOARDS[user.role] ?? '/login'} replace />;
	}

	return <Outlet />;
}
