import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoutes';
import RouteError from './components/ui/RouteError';
import PageFallback from './components/ui/PageFallback';

/*
 * Every page is code-split.
 *
 * Previously all fifteen were statically imported, so a student downloaded the
 * entire admin bundle — including FullCalendar, Chart.js and the Google Maps
 * SDK — before their dashboard could paint.
 */
const LandingPage = lazy(() => import('./pages/shared/LandingPage'));
const LoginPage = lazy(() => import('./pages/shared/LoginPage'));
const ProfilePage = lazy(() => import('./pages/shared/ProfilePage'));

const StudentLayout = lazy(() => import('./layouts/StudentLayout'));
const DashboardPage = lazy(() => import('./pages/student/DashboardPage'));
const ResultsPage = lazy(() => import('./pages/student/ResultsPage'));
const TimetablePage = lazy(() => import('./pages/student/TimetablePage'));
const CourseRegistrationPage = lazy(
	() => import('./pages/student/CourseRegistrationPage'),
);

const LecturerLayout = lazy(() => import('./layouts/LecturerLayout'));
const LecturerDashboardPage = lazy(
	() => import('./pages/lecturer/LecturerDashboardPage'),
);
const LecturerCoursesPage = lazy(
	() => import('./pages/lecturer/LecturerCoursesPage'),
);
const LecturerResultsPage = lazy(
	() => import('./pages/lecturer/LecturerResultsPage'),
);

const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminDashboardPage = lazy(
	() => import('./pages/admin/AdminDashboardPage'),
);
const AdminStudentsPage = lazy(() => import('./pages/admin/AdminStudentsPage'));
const AdminLecturersPage = lazy(
	() => import('./pages/admin/AdminLecturersPage'),
);
const AdminCoursesPage = lazy(() => import('./pages/admin/AdminCoursesPage'));
const AdminOfferingsPage = lazy(
	() => import('./pages/admin/AdminOfferingsPage'),
);
const AdminCourseRegistrationsPage = lazy(
	() => import('./pages/admin/AdminCourseRegistrationsPage'),
);
const AdminResultsPage = lazy(() => import('./pages/admin/AdminResultsPage'));

const NotFoundPage = lazy(() => import('./pages/shared/NotFoundPage'));

/** Wraps a lazily loaded element in the shared skeleton fallback. */
const page = (Component) => (
	<Suspense fallback={<PageFallback />}>
		<Component />
	</Suspense>
);

export const router = createBrowserRouter([
	{
		// The public front door. Previously this redirected straight to /login,
		// so there was nowhere to send someone who had not been given an
		// account yet and no explanation of what the portal is.
		path: '/',
		element: page(LandingPage),
		errorElement: <RouteError />,
	},
	{
		path: '/login',
		element: page(LoginPage),
		errorElement: <RouteError />,
	},
	{
		element: <ProtectedRoute allowedRoles={['student']} />,
		errorElement: <RouteError />,
		children: [
			{
				path: '/student',
				element: page(StudentLayout),
				children: [
					{
						index: true,
						element: <Navigate to='dashboard' replace />,
					},
					{ path: 'dashboard', element: page(DashboardPage) },
					{ path: 'profile', element: page(ProfilePage) },
					{ path: 'results', element: page(ResultsPage) },
					{ path: 'timetable', element: page(TimetablePage) },
					{
						path: 'course-registration',
						element: page(CourseRegistrationPage),
					},
				],
			},
		],
	},
	{
		element: <ProtectedRoute allowedRoles={['lecturer']} />,
		errorElement: <RouteError />,
		children: [
			{
				path: '/lecturer',
				element: page(LecturerLayout),
				children: [
					{
						index: true,
						element: <Navigate to='dashboard' replace />,
					},
					{ path: 'dashboard', element: page(LecturerDashboardPage) },
					{
						path: 'course-details',
						element: page(LecturerCoursesPage),
					},
					{
						path: 'results-management',
						element: page(LecturerResultsPage),
					},
					{ path: 'profile', element: page(ProfilePage) },
				],
			},
		],
	},
	{
		element: <ProtectedRoute allowedRoles={['admin']} />,
		errorElement: <RouteError />,
		children: [
			{
				path: '/admin',
				element: page(AdminLayout),
				children: [
					{
						index: true,
						element: <Navigate to='dashboard' replace />,
					},
					{ path: 'dashboard', element: page(AdminDashboardPage) },
					{ path: 'students', element: page(AdminStudentsPage) },
					{ path: 'lecturers', element: page(AdminLecturersPage) },
					{ path: 'courses', element: page(AdminCoursesPage) },
					{ path: 'offerings', element: page(AdminOfferingsPage) },
					{
						path: 'courses-registrations',
						element: page(AdminCourseRegistrationsPage),
					},
					{ path: 'results', element: page(AdminResultsPage) },
				],
			},
		],
	},
	{
		// Catch-all. Without this an unknown URL rendered a blank page.
		path: '*',
		element: page(NotFoundPage),
		errorElement: <RouteError />,
	},
]);
