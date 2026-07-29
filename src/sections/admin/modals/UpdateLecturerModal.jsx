import Modal from '../../../components/ui/Modal';
import UserForm from '../../../components/shared/UserForm';
import { lecturerFields } from '../../../constants/userFormFields';

export default function UpdateLecturerModal({ lecturer, onClose, onSuccess }) {
	return (
		<Modal heading='Edit Lecturer Details' onClose={onClose}>
			<UserForm
				fields={lecturerFields}
				initialData={lecturer}
				submitLabel='Save Changes'
				onSubmit={async (data) => {
					await new Promise((res) => setTimeout(res, 1000)); // replace with api.put(`/students/${student.id}`, data)
					onClose();
					onSuccess();
				}}
				onCancel={onClose}
			/>
		</Modal>
	);
}
