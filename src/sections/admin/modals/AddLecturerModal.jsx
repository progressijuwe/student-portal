import Modal from '../../../components/ui/Modal';
import UserForm from '../../../components/shared/UserForm';
import { lecturerFields } from '../../../constants/userFormFields';
import { useDepartments } from '../../../hooks/useDepartments';
import { useCreateUser } from '../../../hooks/admin/useCreateUser';

export default function AddLecturerModal({ onClose, onSuccess }) {
	const { data: departments = [] } = useDepartments();
	const { mutateAsync: createUser } = useCreateUser();

	return (
		<Modal heading='Add Lecturer' onClose={onClose}>
			<UserForm
				fields={lecturerFields}
				departments={departments}
				submitLabel='Add Lecturer'
				onSubmit={async (data) => {
					const formData = new FormData();
					formData.append('name', data.name);
					formData.append('email', data.email);
					formData.append('role', 'lecturer');
					formData.append('department_id', data.department_id);
					formData.append('prefix', data.prefix);
					formData.append(
						'highest_qualification',
						data.highest_qualification,
					);
					if (data.specialization)
						formData.append('specialization', data.specialization);
					if (data.photo) formData.append('photo', data.photo);

					await createUser(formData);
					onClose();
					onSuccess?.();
				}}
				onCancel={onClose}
			/>
		</Modal>
	);
}
