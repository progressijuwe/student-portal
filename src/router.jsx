import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import DashboardPage from './pages/student/DashboardPage'
import LoginPage from './pages/student/LoginPage'
import ProfilePage from './pages/student/ProfilePage'
import ResultsPage from './pages/student/ResultsPage'
import TimetablePage from './pages/student/TimetablePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    element: <MainLayout />,
    children: [
      { path: '/dashboard',    element: <DashboardPage /> },
      { path: '/profile',    element: <ProfilePage /> },
      { path: '/results',    element: <ResultsPage /> },
      { path: '/timetable',    element: <TimetablePage /> },
    ],
  },
])