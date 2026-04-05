import { createContext, useContext, useState, useEffect } from "react"
import StudentProfilePhoto from '../assets/images/profile.jpg'
import LecturerProfilePhoto from '../assets/images/lecturerProfile.jpg'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // simulate API call (replace with Laravel later)
        const student = {
            id: "SOF/22U/100098",
            role: "student",
            name: "Stephanie Zikora Obi",
            email: "sobi@student.aust.edu.ng",
            phone: "+234-809-8331-005",
            dob: "2005-04-05",
            address: "House 20A, Sunrise Valley Estate, Abuja",
            emergencyContact: {
                name: "Ngozi Obi",
                phone: "+234-904-9007-331",
            },
            department: "BSc. Software Engineering",
            faculty: "School of Computing",
            year: "4th",
            cgpa: 3.77,
            status: "active",
            profilePhoto: StudentProfilePhoto,
            permissions: [
                "view_results",
                "view_timetable",
                "edit_profile"
            ]
        }

        const lecturer = {
            id: "LEC/100098",
            role: "lecturer",
            name: "Oliver Ama Bassey",
            prefix: "Dr.",
            email: "obassey@staff.aust.edu.ng",
            phone: "+234-809-8331-005",
            dob: "1985-12-11",
            address: "House 20A, Sunrise Valley Estate, Abuja",
            emergencyContact: {
                name: "Ngozi Obi",
                phone: "+234-904-9007-331",
            },
            department: "Software Engineering",
            faculty: "School of Computing",
            status: "active",
            profilePhoto: LecturerProfilePhoto,
            permissions: [
                "view_students",
                "enter_results",
                "edit_results",
                "view_courses"
            ]
        }

        const admin = {
            id: "ADM/0001",
            role: "admin",
            name: "Admin User",
            email: "admin@portal.edu",
            phone: "+234-800-0000-000",
            address: "Head Office, Abuja",
            status: "active",
            profilePhoto: null,
            permissions: [
                "manage_users",
                "manage_roles",
                "view_all_data",
                "approve_documents",
                "delete_records"
            ]
        }

        setUser(admin)

        setLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}