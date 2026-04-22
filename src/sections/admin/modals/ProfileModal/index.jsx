import Modal from "../../../../components/ui/Modal"
import ProfileHeader from "./ProfileHeader"
import ProfileInfoGrid from "./ProfileInfoGrid"
import ProfileStats from "./ProfileStats"
import ProfileResults from "./ProfileResults"
import ProfileActions from "./ProfileActions"

export default function ProfileModal({ student, onClose }) {
    return (
        <Modal heading="Student Profile" onClose={onClose}>
            <div className="flex flex-col gap-6">
                <ProfileHeader student={student} />
                <ProfileInfoGrid student={student} />
                <ProfileStats student={student} />
                <ProfileResults student={student} />
                <ProfileActions 
                    onEdit={() => onEdit(student)}
                    onDelete={() => onDelete(student)}
                />
            </div>
        </Modal>
    )
}