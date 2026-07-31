import Modal from '../../../components/ui/Modal';
import UserForm from '../../../components/shared/UserForm';
import { studentFields } from '../../../constants/userFormFields';
import { useDepartments } from '../../../hooks/useDepartments';
import { useUpdateUser } from '../../../hooks/admin/useUserMutations';

export default function EditStudentModal({ student, onClose, onSuccess }) {
	const { data: departments = [] } = useDepartments();
	const { mutateAsync: updateUser } = useUpdateUser();

	return (
		<Modal heading='Edit Student Details' onClose={onClose}>
			<UserForm
				fields={studentFields}
				departments={departments}
				initialData={student}
				submitLabel='Save Changes'
				onSubmit={async (data) => {
					await updateUser({
						id: student.rawId,
						name: data.name,
						email: data.email,
						department_id: data.department_id,
						study_type: data.study_type,
						entry_year: data.entry_year,
					});
					onClose();
					onSuccess();
				}}
				onCancel={onClose}
			/>
		</Modal>
	);
}
