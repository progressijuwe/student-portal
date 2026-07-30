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
}) {
	const isLecturer = userType === 'lecturer';

	return (
		<Modal heading={heading} onClose={onClose}>
			<div className='flex flex-col gap-6'>
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
				/>
			</div>
		</Modal>
	);
}
