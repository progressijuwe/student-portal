import { useState, useMemo, useEffect, useCallback } from "react"
import StudentToolbar from "../../sections/admin/students/StudentToolbar"
import StudentTable from "../../sections/admin/students/StudentTable"
import Pagination from "../../components/ui/Pagination"
import AddStudentModal from "../../sections/admin/modals/AddStudentModal"
import AddSuccessModal from "../../sections/admin/modals/AddSuccessModal"
import FilterModal from "../../sections/admin/modals/FilterModal"
import DeleteStudentModal from "../../sections/admin/modals/DeleteStudentModal"
import UpdateStudentModal from "../../sections/admin/modals/UpdateStudentModal"
import ProfileModal from "../../sections/admin/modals/ProfileModal"
import { AnimatePresence } from "framer-motion"

import { useStudentQuery } from "../../hooks/useStudentQuery"
import { useModal } from "../../hooks/useModal"
import { filterStudents } from "../../utils/filterStudents"

import studentPhoto from "../../assets/images/studentPhoto.jpg"


export const studentsData = [
    {
        id: "SOF/22U/10022",
        profilePhoto: studentPhoto,
        name: "Progress Chukwuyenum Ijuwe",
        email: "pijuwe@student.aust.edu.ng",
        phone: "+234-801-234-5678",
        faculty: "School of Computing",
        department: "Software Engineering",
        level: "100",
        enrollmentYear: "2026",
        address: "No. 13, Fifikachiri Close, Pinnock Estate, Galadimawa, Rumueme, Abuja, FCT",
        emergencyName: "Alexander Ijuwe",
        emergencyPhone: "081394949399"
    },
    {
        id: "CSC/22U/10012",
        name: "Amina Shehu Rilwan",
        email: "arilwan@student.aust.edu.ng",
        phone: "+234-901-109-1102",
        faculty: "School of Computing",
        department: "Computer Science",
        level: "200",
        enrollmentYear: "2026",
        address: "No. 21, Aba Road, Port Harcourt, Rivers State",
        emergencyName: "Shehu Rilwan",
        emergencyPhone: "08031234567"
    },
    {
        id: "BUS/22U/10032",
        name: "Aisha Armani Abdul",
        email: "aabdul@student.aust.edu.ng",
        phone: "+234-801-234-5678",
        faculty: "School of Management",
        department: "Business Administration",
        level: "100",
        enrollmentYear: "2025",
        address: "No. 10, Wuse Zone 2, Abuja, FCT",
        emergencyName: "Armani Abdul",
        emergencyPhone: "08022334455"
    },
    {
        id: "ACC/22U/10048",
        name: "Nabil Ibrahim Abba",
        email: "nabba@student.aust.edu.ng",
        phone: "+234-801-234-5678",
        faculty: "School of Management",
        department: "Accounting",
        level: "100",
        enrollmentYear: "2025",
        address: "No. 5, Kano Road, Kaduna State",
        emergencyName: "Ibrahim Abba",
        emergencyPhone: "08111222333"
    },
    {
        id: "PET/22U/10042",
        name: "David Olofu Agbaji",
        email: "dagbaji@student.aust.edu.ng",
        phone: "+234-801-234-5678",
        faculty: "School of Engineering",
        department: "Petroleum Engineering",
        level: "100",
        enrollmentYear: "2025",
        address: "No. 8, GRA, Yenagoa, Bayelsa State",
        emergencyName: "Olofu Agbaji",
        emergencyPhone: "08099887766"
    },
    {
        id: "MEC/22U/10011",
        name: "Rachael Ifeoma Nnamadim",
        email: "rnnamadim@student.aust.edu.ng",
        phone: "+234-801-234-5678",
        faculty: "School of Engineering",
        department: "Mechanical Engineering",
        level: "100",
        enrollmentYear: "2025",
        address: "No. 12, Independence Layout, Enugu State",
        emergencyName: "Chinedu Nnamadim",
        emergencyPhone: "08122334455"
    },
    {
        id: "SOF/22U/10023",
        name: "Desmond Lindsey Ubi",
        email: "dubi@student.aust.edu.ng",
        phone: "+234-801-234-5678",
        faculty: "School of Computing",
        department: "Software Engineering",
        level: "200",
        enrollmentYear: "2025",
        address: "No. 3, Rumuola, Port Harcourt, Rivers State",
        emergencyName: "Lindsey Ubi",
        emergencyPhone: "08066778899"
    },
    {
        id: "CSC/22U/10013",
        name: "Favour Olushola Kowe",
        email: "fkowe@student.aust.edu.ng",
        phone: "+234-801-234-5678",
        faculty: "School of Computing",
        department: "Computer Science",
        level: "100",
        enrollmentYear: "2025",
        address: "No. 18, Lekki Phase 1, Lagos State",
        emergencyName: "Olushola Kowe",
        emergencyPhone: "08033445566"
    },
    {
        id: "EEE/22U/10055",
        name: "Samuel Okeke Nwafor",
        email: "snwafor@student.aust.edu.ng",
        phone: "+234-802-556-7788",
        faculty: "School of Engineering",
        department: "Electrical Engineering",
        level: "300",
        enrollmentYear: "2024",
        address: "No. 9, New Haven, Enugu State",
        emergencyName: "Okeke Nwafor",
        emergencyPhone: "08199887766"
    },
    {
        id: "CIV/22U/10077",
        name: "Grace Johnson Adeyemi",
        email: "gadeyemi@student.aust.edu.ng",
        phone: "+234-803-998-1122",
        faculty: "School of Engineering",
        department: "Civil Engineering",
        level: "200",
        enrollmentYear: "2024",
        address: "No. 6, Bodija, Ibadan, Oyo State",
        emergencyName: "Johnson Adeyemi",
        emergencyPhone: "08055667788"
    }
]

const perPage = 8;

const MODAL = {
    ADD_STUDENT: "add-student",
    SUCCESS: "success",
    FILTER: "filter",
    VIEW: "view",
    DELETE: "delete-student",
    DELETE_SUCCESS: "delete",
    EDIT: "edit-student",
    EDIT_SUCCESS: "edit"
}

export default function AdminStudentsPage() {
    const { search, page, filters, setSearch, setFilters, setPage } = useStudentQuery()
    const { modal, open, close } = useModal()

    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [debouncedSearch, setDebouncedSearch] = useState("")

    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search), 300)
        return () => clearTimeout(t)
    }, [search])

    useEffect(() => {
        setPage(1)
    }, [filters.faculty, filters.department, filters.level, filters.enrollmentYear, debouncedSearch])

    const fetchStudents = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            await new Promise(res => setTimeout(res, 1000))
            setStudents(studentsData)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchStudents()
    }, [fetchStudents])

    const filteredStudents = useMemo(
        () =>
            filterStudents(
                students,
                debouncedSearch,
                { faculty, department, level, enrollmentYear }
            ),
        [students, debouncedSearch, faculty, department, level, enrollmentYear]
    )

    const totalPages = useMemo(
        () => Math.ceil(filteredStudents.length / perPage),
        [filteredStudents.length]
    )
    const safePage = page > totalPages ? 1 : page

    const paginatedStudents = useMemo(() => {
        const start = (safePage - 1) * perPage
        return filteredStudents.slice(start, start + perPage)
    }, [filteredStudents, safePage])

    const handleAddSuccess = () => {
        open(MODAL.SUCCESS)
        setTimeout(close, 2000)
    }

    const handleDeleteSuccess = () => {
        open(MODAL.DELETE_SUCCESS)
        setTimeout(close, 2000)
    }

    const handleEditSuccess = () => {
        open(MODAL.EDIT_SUCCESS)
        setTimeout(close, 2000)
    }

    const handleView = useCallback((s) => open(MODAL.VIEW, s), [open])
    const handleEdit = useCallback((s) => open(MODAL.EDIT, s), [open])
    const handleDelete = useCallback((s) => open(MODAL.DELETE, s), [open])

    return (
        <div className="flex flex-col gap-5 lg:py-6 py-8 lg:px-8 px-5">
            <h2 className="text-xl lg:text-[30px] font-semibold">Students</h2>
            <div className="flex flex-col gap-4 lg:gap-3 w-full justify-between border border-border bg-white rounded-[10px]">
                <StudentToolbar
                    search={search}
                    onSearch={setSearch}
                    onAddStudent={() => open(MODAL.ADD)}
                    onFilter={() => open(MODAL.FILTER)}
                />
                <StudentTable
                    students={paginatedStudents}
                    loading={loading}
                    error={error}
                    onRetry={fetchStudents}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                {!error && !loading && totalPages > 1 && (
                    <Pagination
                        page={page}
                        total={filteredStudents.length}
                        perPage={perPage}
                        onPageChange={setPage}
                    />
                )}
                <AnimatePresence>
                    {modal.type === MODAL.ADD && (
                        <AddStudentModal onClose={close} onSuccess={handleAddSuccess} />
                    )}

                    {modal.type === MODAL.SUCCESS && (
                        <AddSuccessModal onClose={close} text="Student Added Successfully" />
                    )}

                    {modal.type === MODAL.FILTER && (
                        <FilterModal
                            onClose={close}
                            onApply={setFilters}
                            initialFilters={filters}
                        />
                    )}

                    {modal.type === MODAL.DELETE && (
                        <DeleteStudentModal
                            student={modal.data}
                            onClose={close}
                            onSuccess={handleDeleteSuccess}
                        />
                    )}

                    {modal.type === MODAL.DELETE_SUCCESS && (
                        <AddSuccessModal onClose={close} text="Student Deleted Successfully" />
                    )}

                    {modal.type === MODAL.EDIT && (
                        <UpdateStudentModal
                            student={modal.data}
                            onClose={close}
                            onSuccess={handleEditSuccess}
                        />
                    )}

                    {modal.type === MODAL.EDIT_SUCCESS && (
                        <AddSuccessModal onClose={close} text="Student Updated Successfully" />
                    )}

                    {modal.type === MODAL.VIEW && (
                        <ProfileModal student={modal.data} onClose={close} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}