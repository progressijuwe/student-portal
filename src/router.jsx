import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from './pages/student/DashboardPage';
import ProfilePage from './pages/shared/ProfilePage';
import ResultsPage from './pages/student/ResultsPage';
import TimetablePage from './pages/student/TimetablePage';
import StudentLayout from './layouts/StudentLayout';
import LecturerLayout from './layouts/LecturerLayout';
import LecturerDashboardPage from './pages/lecturer/LecturerDashboardPage';
import LecturerCoursesPage from './pages/lecturer/LecturerCoursesPage';
import LecturerResultsPage from './pages/lecturer/LecturerResultsPage';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminStudentsPage from './pages/admin/AdminStudentsPage';
import AdminLecturersPage from './pages/admin/AdminLecturersPage';
import AdminCoursesPage from './pages/admin/AdminCoursesPage';
import AdminCourseRegistrationsPage from './pages/admin/AdminCourseRegistrationsPage';
import AdminResultsPage from './pages/admin/AdminResultsPage';
import CourseRegistrationPage from './pages/student/CourseRegistrationPage';
import LoginPage from './pages/shared/LoginPage';
import ProtectedRoute from './routes/ProtectedRoutes';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <LoginPage />,
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		element: <ProtectedRoute allowedRoles={['student']} />,
		children: [
			{
				path: '/student',
				element: <StudentLayout />,
				children: [
					{ path: 'dashboard', element: <DashboardPage /> },
					{ path: 'profile', element: <ProfilePage /> },
					{ path: 'results', element: <ResultsPage /> },
					{ path: 'timetable', element: <TimetablePage /> },
					{
						path: 'course-registration',
						element: <CourseRegistrationPage />,
					},
				],
			},
		],
	},
	{
		element: <ProtectedRoute allowedRoles={['lecturer']} />,
		children: [
			{
				path: '/lecturer',
				element: <LecturerLayout />,
				children: [
					{ path: 'dashboard', element: <LecturerDashboardPage /> },
					{
						path: 'course-details',
						element: <LecturerCoursesPage />,
					},
					{
						path: 'results-management',
						element: <LecturerResultsPage />,
					},
					{ path: 'profile', element: <ProfilePage /> },
				],
			},
		],
	},
	{
		element: <ProtectedRoute allowedRoles={['admin']} />,
		children: [
			{
				path: '/admin',
				element: <AdminLayout />,
				children: [
					{ path: 'dashboard', element: <AdminDashboardPage /> },
					{ path: 'students', element: <AdminStudentsPage /> },
					{ path: 'lecturers', element: <AdminLecturersPage /> },
					{ path: 'courses', element: <AdminCoursesPage /> },
					{
						path: 'courses-registrations',
						element: <AdminCourseRegistrationsPage />,
					},
					{ path: 'results', element: <AdminResultsPage /> },
				],
			},
		],
	},
]);
