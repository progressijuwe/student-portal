import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute({ allowedRoles = [] }) {

    const { user, loading } = useAuth()

    if (loading) return <p>Loading...</p>

    // Not logged in
    if (!user) {
        return <Navigate to="/" replace />
    }

    // Role not allowed
    if (!allowedRoles.includes(user.role)) {
        // Redirect based on role
        switch(user.role) {
            case "Student":
                return <Navigate to="/student/dashboard" replace />
            case "Lecturer":
                return <Navigate to="/lecturer/dashboard" replace />
            case "Admin":
                return <Navigate to="/admin/dashboard" replace />
            default:
                return <Navigate to="/" replace />
        }
    }

    return <Outlet />
}