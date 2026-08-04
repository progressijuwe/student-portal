import Modal from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import TemporaryPassword from '../../../components/ui/TemporaryPassword';

/**
 * Shown after an account is created or its password is reset.
 *
 * Unlike the generic success modal this one does *not* dismiss itself after two
 * seconds: the temporary password is only legible here, so closing it out from
 * under the admin would mean resetting the account again to recover it.
 */
export default function UserCredentialsModal({
	heading,
	description,
	user,
	onClose,
}) {
	return (
		<Modal heading={heading} description={description} onClose={onClose}>
			<div className='flex flex-col gap-5 px-4 pb-4'>
				<TemporaryPassword
					email={user?.email}
					password={user?.temporary_password}
				/>

				<div className='flex justify-end'>
					<Button onClick={onClose}>I've saved the password</Button>
				</div>
			</div>
		</Modal>
	);
}
