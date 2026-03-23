import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import ResultsPage from './pages/ResultsPage'

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
    ],
  },
])