import Modal from '../../../../components/ui/Modal';
import ProfileHeader from './ProfileHeader';
import ProfileInfoGrid from './ProfileInfoGrid';
import ProfileStats from './ProfileStats';
import ProfileResults from './ProfileResults';
import ProfileAssignedCourses from './ProfileAssignedCourses';
import ProfileActions from './ProfileActions';

export default function ProfileModal({
	user,
	userType,
	heading,
	onClose,
	onEdit,
	onDelete,
	onResetPassword,
}) {
	const isLecturer = userType === 'lecturer';

	return (
		<Modal heading={heading} onClose={onClose}>
			<div className='flex flex-col gap-6'>
				{user?.resetRequestedAt && (
					<p
						role='status'
						className='mx-4 rounded-[10px] bg-[#FFF7ED] px-4 py-3 text-sm text-[#9F0712]'
					>
						<span className='font-semibold'>
							Password reset requested
						</span>{' '}
						— this user cannot sign in and is waiting on a new
						temporary password.
					</p>
				)}

				<ProfileHeader user={user} />
				<ProfileInfoGrid user={user} />
				<ProfileStats user={user} />

				{isLecturer ? (
					<ProfileAssignedCourses user={user} />
				) : (
					<ProfileResults user={user} />
				)}

				<ProfileActions
					onEdit={() => onEdit(user)}
					onDelete={() => onDelete(user)}
					onResetPassword={
						onResetPassword
							? () => onResetPassword(user)
							: undefined
					}
					resetRequested={Boolean(user?.resetRequestedAt)}
				/>
			</div>
		</Modal>
	);
}
