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
            role: "student",
            name: "Stephanie Zikora Obi",
            email: "sobi@student.aust.edu.ng",
            phone: "+234-809-8331-005",
            dob: "5th April, 2005",
            address: "House 20A, Sunrise Valley Estate, Abuja",
            emergencyContactName: "Ngozi Obi",
            emergencyContactNumber: "+234-904-9007-331",
            id: "SOF/22U/100098",
            dept: "BSc. Software Engineering",
            studyYear: "4th Year",
            CGPA: 3.77,
            profilePhoto: StudentProfilePhoto
        }

        const lecturer = {
            role: "lecturer",
            prefix: "Dr.",
            name: "Oliver Ama Bassey",
            email: "obassey@staff.aust.edu.ng",
            phone: "+234-809-8331-005",
            dob: "11th December, 2005",
            emergencyContactName: "Ngozi Obi",
            emergencyContactNumber: "+234-904-9007-331",
            id: "LEC/100098",
            dept: "Software Engineering Department",
            faculty: "School of Computing",
            address: "House 20A, Sunrise Valley Estate, Abuja",
            profilePhoto: LecturerProfilePhoto
        }

        setUser(lecturer)
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