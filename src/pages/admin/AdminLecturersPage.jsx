import { AnimatePresence } from "framer-motion"
import { useEntityPage } from "../../hooks/useEntityPage"
import { useLecturerQuery } from "../../hooks/useLecturerQuery"
import { filterLecturers } from "../../utils/filterLecturers"
import { lecturerFilterFields } from "../../constants/filterConfig"
import TableToolbar from "../../components/shared/TableToolbar"
import LecturerTable from "../../sections/admin/lecturers/LecturerTable"
import Pagination from "../../components/ui/Pagination"
import AddLecturerModal from "../../sections/admin/modals/AddLecturerModal"
import AddSuccessModal from "../../sections/admin/modals/AddSuccessModal"
import FilterModal from "../../sections/admin/modals/FilterModal"
import DeleteStudentModal from "../../sections/admin/modals/DeleteStudentModal"
import UpdateLecturerModal from "../../sections/admin/modals/UpdateLecturerModal"
import ProfileModal from "../../sections/admin/modals/ProfileModal"
import EntityPageShell from '../../components/ui/EntityPageShell'

import { lecturersData } from "../../data/lecturersData"

const MODAL = {
  ADD:            "add",
  SUCCESS:        "success",
  FILTER:         "filter",
  VIEW:           "view",
  DELETE:         "delete",
  DELETE_SUCCESS: "delete-success",
  EDIT:           "edit",
  EDIT_SUCCESS:   "edit-success",
}

export default function AdminLecturersPage() {
    const {
        search, filters, page, setSearch, setFilters, setPage,
        items, filteredItems, totalPages,
        loading, error, modal, open, close,
        fetchItems, handleView, handleEdit, handleDelete, handleSuccess,
    } = useEntityPage({
        data: lecturersData,
        filterFn: filterLecturers,
        useQueryHook: useLecturerQuery,
    })

    const openLecturerModal = () => open(MODAL.ADD)
    const openFilterModal = () => open(MODAL.FILTER)

    return (
        <EntityPageShell title="Lecturers">
            <TableToolbar
                search={search}
                onSearch={setSearch}
                onAdd={openLecturerModal}
                onFilter={openFilterModal}
                addLabel="Add Lecturer"
                searchPlaceholder="Search lecturers"
            />
            <LecturerTable
                lecturers={items}
                loading={loading}
                error={error}
                onRetry={fetchItems}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            {!error && !loading && totalPages > 1 && (
                <Pagination page={page} total={filteredItems.length} perPage={8} onPageChange={setPage} />
            )}
            <AnimatePresence>
                {modal.type === MODAL.ADD && (
                    <AddLecturerModal onClose={close} onSuccess={() => handleSuccess(MODAL.SUCCESS)} />
                )}
                {modal.type === MODAL.SUCCESS && (
                    <AddSuccessModal onClose={close} text="Lecturer Added Successfully" />
                )}
                {modal.type === MODAL.FILTER && (
                    <FilterModal heading="Filter Lecturers" fields={lecturerFilterFields} onClose={close} onApply={setFilters} initialFilters={filters} />
                )}
                {modal.type === MODAL.DELETE && (
                    <DeleteStudentModal lecturer={modal.data} onClose={close} onSuccess={() => handleSuccess(MODAL.DELETE_SUCCESS)} />
                )}
                {modal.type === MODAL.DELETE_SUCCESS && (
                    <AddSuccessModal onClose={close} text="Lecturer Deleted Successfully" />
                )}
                {modal.type === MODAL.EDIT && (
                    <UpdateLecturerModal lecturer={modal.data} onClose={close} onSuccess={() => handleSuccess(MODAL.EDIT_SUCCESS)} />
                )}
                {modal.type === MODAL.EDIT_SUCCESS && (
                    <AddSuccessModal onClose={close} text="Lecturer Updated Successfully" />
                )}
                {modal.type === MODAL.VIEW && (
                    <ProfileModal heading="Lecturer Profile" user={modal.data} userType="lecturer" onClose={close} onEdit={handleEdit} onDelete={handleDelete} />
                )}
            </AnimatePresence>
        </EntityPageShell>
    )
}