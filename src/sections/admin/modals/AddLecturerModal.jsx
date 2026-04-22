import Modal from "../../../components/ui/Modal"
import UserForm from "../../../components/shared/UserForm"
import { lecturerFields } from "../../../components/shared/UserForm"

export default function AddLecturerModal({ onClose, onSuccess }) {
    return (
        <Modal heading="Add Lecturer" onClose={onClose}>
            <UserForm
                fields={lecturerFields}
                submitLabel="Add Lecturer"
                onSubmit={async (data) => {
                    await new Promise(res => setTimeout(res, 1000)) // replace with API
                    onClose()
                    onSuccess()
                }}
                onCancel={onClose}
            />
        </Modal>
    )
}