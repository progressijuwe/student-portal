import { createBrowserRouter } from 'react-router-dom'
import DashboardPage from './pages/student/DashboardPage'
import StudentLoginPage from './pages/student/LoginPage'
import LecturerLoginPage from './pages/lecturer/LoginPage'
import ProfilePage from './pages/shared/ProfilePage'
import ResultsPage from './pages/student/ResultsPage'
import TimetablePage from './pages/student/TimetablePage'
import StudentLayout from './layouts/StudentLayout'
import LecturerLayout from './layouts/LecturerLayout'
import LecturerDashboardPage from './pages/lecturer/LecturerDashboardPage'
import LecturerCoursesPage from './pages/lecturer/LecturerCoursesPage'
import LecturerResultsPage from './pages/lecturer/LecturerResultsPage'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminStudentsPage from './pages/admin/AdminStudentsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StudentLoginPage />
  },
  {
    path: '/lecturer/login',
    element: <LecturerLoginPage />
  },
  {
    path: '/student',
    element: <StudentLayout />,
    children: [
      { path: 'dashboard',    element: <DashboardPage /> },
      { path: 'profile',    element: <ProfilePage /> },
      { path: 'results',    element: <ResultsPage /> },
      { path: 'timetable',    element: <TimetablePage /> },
    ],
  },
  {
    path: '/lecturer',
    element: <LecturerLayout />,
    children: [
      { path: 'dashboard',    element: <LecturerDashboardPage /> },
      { path: 'course-details',    element: <LecturerCoursesPage /> },
      { path: 'results-management',    element: <LecturerResultsPage /> },
      { path: 'profile',    element: <ProfilePage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'dashboard', element: <AdminDashboardPage />},
      { path: 'students', element: <AdminStudentsPage />},
    ]
  }
])