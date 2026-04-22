import Modal from "../../../components/ui/Modal"
import UserForm from "../../../components/shared/UserForm"
import { studentFields } from "../../../components/shared/UserForm"

export default function AddStudentModal({ onClose, onSuccess }) {
    return (
        <Modal heading="Fill in Student Details" onClose={onClose}>
            <UserForm
                fields={studentFields}
                submitLabel="Add Student"
                onSubmit={async (data) => {
                    await new Promise(res => setTimeout(res, 1000)) // replace with api.post('/students', data)
                    onClose()
                    onSuccess()
                }}
                onCancel={onClose}
            />
        </Modal>
    )
}