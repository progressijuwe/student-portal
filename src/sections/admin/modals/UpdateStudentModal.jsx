import Modal from "../../../components/ui/Modal"
import UserForm, { studentFields } from "../../../components/shared/UserForm"

export default function EditStudentModal({ student, onClose, onSuccess }) {
    return (
        <Modal heading="Edit Student Details" onClose={onClose}>
            <UserForm
                fields={studentFields}
                initialData={student}
                submitLabel="Save Changes"
                onSubmit={async (data) => {
                    await new Promise(res => setTimeout(res, 1000)) // replace with api.put(`/students/${student.id}`, data)
                    onClose()
                    onSuccess()
                }}
                onCancel={onClose}
            />
        </Modal>
    )
}