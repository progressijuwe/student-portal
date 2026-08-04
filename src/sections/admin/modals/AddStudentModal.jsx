import Modal from '../../../components/ui/Modal';
import UserForm from '../../../components/shared/UserForm';
import { studentFields } from '../../../constants/userFormFields';
import { useDepartments } from '../../../hooks/useDepartments';
import { useCreateUser } from '../../../hooks/admin/useCreateUser';

export default function AddStudentModal({ onClose, onSuccess }) {
	const { data: departments = [] } = useDepartments();
	const { mutateAsync: createUser } = useCreateUser();

	return (
		<Modal heading='Fill in Student Details' onClose={onClose}>
			<UserForm
				fields={studentFields}
				departments={departments}
				submitLabel='Add Student'
				onSubmit={async (data) => {
					const formData = new FormData();
					formData.append('name', data.name);
					formData.append('email', data.email);
					formData.append('role', 'student');
					formData.append('department_id', data.department_id);
					formData.append('study_type', data.study_type);
					formData.append('entry_year', data.entry_year);
					if (data.photo) formData.append('photo', data.photo);

					// The created user carries the temporary password, which is
					// only in this response — the caller shows it to the admin.
					const created = await createUser(formData);
					onClose();
					onSuccess?.(created);
				}}
				onCancel={onClose}
			/>
		</Modal>
	);
}
