import { useState, useMemo, useEffect, useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import StudentToolbar from "../../sections/admin/students/StudentToolbar";
import StudentTable from "../../sections/admin/students/StudentTable";
import Pagination from "../../components/ui/Pagination";
import AddStudentModal from "../../sections/admin/dashboard/components/AddStudentModal";
import AddSuccessModal from "../../sections/admin/dashboard/components/AddSuccessModal";
import { AnimatePresence } from "framer-motion"
import FilterModal from "../../sections/admin/students/components/FilterModal";
import DeleteStudentModal from "../../sections/admin/dashboard/components/DeleteStudentModal";

export const studentsData = [
  {
    id: "SOF/22U/10022",
    name: "Progress Chukwuyenum Ijuwe",
    email: "pijuwe@student.aust.edu.ng",
    phone: "+234-801-234-5678",
    faculty: "School of Computing",
    department: "Software Engineering",
    level: "100",
    date: "04/09/2026",
  },
  {
    id: "CSC/22U/10012",
    name: "Amina Shehu Rilwan",
    email: "arilwan@student.aust.edu.ng",
    phone: "+234-901-109-1102",
    faculty: "School of Computing",
    department: "Computer Science",
    level: "200",
    date: "04/09/2026",
  },
  {
    id: "BUS/22U/10032",
    name: "Aisha Armani Abdul",
    email: "aabdul@student.aust.edu.ng",
    phone: "+234-801-234-5678",
    faculty: "School of Management",
    department: "Business Administration",
    level: "100",
    date: "03/09/2026",
  },
  {
    id: "ACC/22U/10048",
    name: "Nabil Ibrahim Abba",
    email: "nabba@student.aust.edu.ng",
    phone: "+234-801-234-5678",
    faculty: "School of Management",
    department: "Accounting",
    level: "100",
    date: "03/09/2026",
  },
  {
    id: "PET/22U/10042",
    name: "David Olofu Agbaji",
    email: "dagbaji@student.aust.edu.ng",
    phone: "+234-801-234-5678",
    faculty: "School of Engineering",
    department: "Petroleum Engineering",
    level: "100",
    date: "03/09/2026",
  },
  {
    id: "MEC/22U/10011",
    name: "Rachael Ifeoma Nnamadim",
    email: "rnnamadim@student.aust.edu.ng",
    phone: "+234-801-234-5678",
    faculty: "School of Engineering",
    department: "Mechanical Engineering",
    level: "100",
    date: "01/09/2026",
  },
  {
    id: "SOF/22U/10023",
    name: "Desmond Lindsey Ubi",
    email: "dubi@student.aust.edu.ng",
    phone: "+234-801-234-5678",
    faculty: "School of Computing",
    department: "Software Engineering",
    level: "200",
    date: "31/08/2026",
  },
  {
    id: "CSC/22U/10013",
    name: "Favour Olushola Kowe",
    email: "fkowe@student.aust.edu.ng",
    phone: "+234-801-234-5678",
    faculty: "School of Computing",
    department: "Computer Science",
    level: "100",
    date: "31/08/2026",
  },
  {
    id: "EEE/22U/10055",
    name: "Samuel Okeke Nwafor",
    email: "snwafor@student.aust.edu.ng",
    phone: "+234-802-556-7788",
    faculty: "School of Engineering",
    department: "Electrical Engineering",
    level: "300",
    date: "30/08/2026",
  },
  {
    id: "CIV/22U/10077",
    name: "Grace Johnson Adeyemi",
    email: "gadeyemi@student.aust.edu.ng",
    phone: "+234-803-998-1122",
    faculty: "School of Engineering",
    department: "Civil Engineering",
    level: "200",
    date: "29/08/2026",
  },
]

const perPage = 8;

const MODAL = {
    ADD_STUDENT: "add-student",
    SUCCESS: "success",
    FILTER: "filter",
    DELETE: "delete-student",
    DELETE_SUCCESS: "delete"
}

export default function AdminStudentsPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [students, setStudents] = useState([])
    const [modal, setModal] = useState(null)
    const [debouncedSearch, setDebouncedSearch] = useState("")

    const search = searchParams.get("q") || ""
    const page   = Number(searchParams.get("page")) || 1
    const filters = {
        faculty:    searchParams.get("faculty")    || "",
        department: searchParams.get("department") || "",
        level:      searchParams.get("level")      || "",
        date:       searchParams.get("date")       || "",
    }

    const updateParams = useCallback((updates) => {
        setSearchParams(prev => {
        const next = new URLSearchParams(prev)
        Object.entries(updates).forEach(([key, value]) => {
            if (value) {
            next.set(key, value)
            } else {
            next.delete(key)
            }
        })
        return next
        })
    }, [setSearchParams])

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedSearch(search), 300)
        return () => clearTimeout(timeout)
    }, [search])

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

    const filteredStudents = useMemo(() => {
        if (!Array.isArray(students)) return []
        return students.filter((student) => {
        const matchesSearch =
            student.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            student.email.toLowerCase().includes(debouncedSearch.toLowerCase())

        const matchesFaculty    = !filters.faculty    || student.faculty    === filters.faculty
        const matchesDepartment = !filters.department || student.department === filters.department
        const matchesLevel      = !filters.level      || student.level      === filters.level

        const matchesDate = (() => {
            if (!filters.date) return true
            const studentDate = new Date(student.date.split("/").reverse().join("-"))
            const diffDays = (new Date() - studentDate) / (1000 * 60 * 60 * 24)
            if (filters.date === "7")  return diffDays <= 7
            if (filters.date === "30") return diffDays <= 30
            return true
        })()

        return matchesSearch && matchesFaculty && matchesDepartment && matchesLevel && matchesDate
        })
    }, [students, debouncedSearch, filters])

    const paginatedStudents = useMemo(() => {
        const start = (page - 1) * perPage
        return filteredStudents.slice(start, start + perPage)
    }, [filteredStudents, page])

    const handleSearch    = useCallback((value) => updateParams({ q: value, page: null }), [updateParams])
    const handleFilter    = useCallback((newFilters) => updateParams({ ...newFilters, page: null }), [updateParams])
    const handlePageChange = useCallback((newPage) => updateParams({ page: newPage }), [updateParams])

    const openAddModal    = useCallback(() => setModal(MODAL.ADD_STUDENT), [])
    const openDeleteModal = useCallback(() => setModal(MODAL.DELETE), [])
    const openFilterModal = useCallback(() => setModal(MODAL.FILTER), [])
    const closeModal      = useCallback(() => setModal(null), [])

    const handleAddSuccess = useCallback(() => {
        setModal(MODAL.SUCCESS)
        setTimeout(() => setModal(null), 2000)
    }, [])

    const handleDeleteSuccess = useCallback(() => {
        setModal(MODAL.DELETE_SUCCESS)
        setTimeout(() => setModal(null), 2000)
    }, [])

    return (
        <div className="flex flex-col gap-5 lg:py-6 py-8 lg:px-8 px-5">
            <h2 className="text-xl lg:text-[30px] font-semibold">Students</h2>
            <div className="flex flex-col gap-4 lg:gap-3 w-full justify-between border border-border bg-white rounded-[10px]">
                <StudentToolbar
                    search={search}
                    onSearch={handleSearch}
                    onAddStudent={openAddModal}
                    onFilter={openFilterModal}
                />
                <StudentTable
                    students={paginatedStudents}
                    loading={loading}
                    error={error}
                    onRetry={fetchStudents}
                    onDeleteStudent={openDeleteModal}
                />
                {!error && !loading && filteredStudents.length > 0 && (
                    <Pagination
                        page={page}
                        total={filteredStudents.length}
                        perPage={perPage}
                        onPageChange={handlePageChange}
                    />
                )}
                <AnimatePresence>
                    {modal === MODAL.ADD_STUDENT && (
                        <AddStudentModal onClose={closeModal} onSuccess={handleAddSuccess} />
                    )}
                    {modal === MODAL.SUCCESS && (
                        <AddSuccessModal onClose={closeModal} text="Student Added Successfully" />
                    )}
                    {modal === MODAL.FILTER && (
                        <FilterModal
                        onClose={closeModal}
                        onApply={handleFilter}
                        initialFilters={filters}
                        />
                    )}
                    {modal === MODAL.DELETE && (
                        <DeleteStudentModal onClose={closeModal} onSuccess={handleDeleteSuccess} />
                    )}
                    {modal === MODAL.DELETE_SUCCESS && (
                        <AddSuccessModal onClose={closeModal} text="Student Deleted Successfully" />
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}