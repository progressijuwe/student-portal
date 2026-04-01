import { createBrowserRouter } from 'react-router-dom'
import DashboardPage from './pages/student/DashboardPage'
import StudentLoginPage from './pages/student/LoginPage'
import LecturerLoginPage from './pages/lecturer/LoginPage'
import ProfilePage from './pages/student/ProfilePage'
import ResultsPage from './pages/student/ResultsPage'
import TimetablePage from './pages/student/TimetablePage'
import StudentLayout from './layouts/StudentLayout'
import LecturerLayout from './layouts/LecturerLayout'
import LecturerDashboardPage from './pages/lecturer/LecturerDashboardPage'
import LecturerCoursesPage from './pages/lecturer/LecturerCoursesPage'

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
      { path: 'results-management',    element: <ResultsPage /> },
      { path: 'profile',    element: <TimetablePage /> },
    ],
  },
])