import { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import UserForm from '../../../components/shared/UserForm';
import { lecturerFields } from '../../../constants/userFormFields';
import { useDepartments } from '../../../hooks/useDepartments';
import { useUpdateUser } from '../../../hooks/admin/useUserMutations';
import { getErrorMessage } from '../../../utils/getErrorMessage';

export default function UpdateLecturerModal({ lecturer, onClose, onSuccess }) {
	const { data: departments = [] } = useDepartments();
	const { mutateAsync: updateUser } = useUpdateUser();
	const [error, setError] = useState(null);

	return (
		<Modal heading='Edit Lecturer Details' onClose={onClose}>
			{error && (
				<p role='alert' className='px-4 text-sm text-red-600'>
					{error}
				</p>
			)}

			<UserForm
				fields={lecturerFields}
				departments={departments}
				initialData={lecturer}
				submitLabel='Save Changes'
				onSubmit={async (data) => {
					setError(null);

					try {
						// Previously a one-second setTimeout with a TODO comment: the
						// dialog reported success and closed without ever calling the API.
						await updateUser({
							id: lecturer.rawId,
							name: data.name,
							email: data.email,
							department_id: data.department_id,
							prefix: data.prefix,
							highest_qualification: data.highest_qualification,
							specialization: data.specialization,
						});

						onClose();
						onSuccess();
					} catch (requestError) {
						setError(getErrorMessage(requestError));
					}
				}}
				onCancel={onClose}
			/>
		</Modal>
	);
}
