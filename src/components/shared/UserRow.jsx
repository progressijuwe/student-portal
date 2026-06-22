import Eye   from '../../assets/svg/view.svg?react'
import Edit  from '../../assets/svg/editIcon.svg?react'
import Trash from '../../assets/svg/trash.svg?react'
import EmailIcon from '../../assets/svg/email.svg?react'
import PhoneIcon from '../../assets/svg/phone.svg?react'

export default function UserRow({ user, onView, onEdit, onDelete }) {
    return (
        <tr className="border-t border-border text-sm">
            <td className="py-4 px-2 font-semibold">{user.id}</td>
            <td className="py-4 px-2">
                <p className="font-medium text-black">{user.name}</p>
            </td>
            <td className="py-4 px-2 text-label font-medium">
                <span className="flex items-center gap-1"><EmailIcon className="size-4" /> {user.email}</span>
                <span className="flex items-center gap-1"><PhoneIcon className="size-4" /> {user.phone}</span>
            </td>
            <td className="py-4 px-2 font-medium">{user.department}</td>
            <td className="py-4 px-2 font-medium">{user.level ?? user.courses?.length}</td>
            <td className="py-4 px-2 font-medium text-center">{user.enrollmentYear ?? user.joinYear}</td>
            <td className="py-4 px-2">
                <div className="flex justify-center gap-2.5">
                    <button aria-label="View"   onClick={() => onView?.(user)}><Eye   className="size-5 [&_path]:stroke-label" /></button>
                    <button aria-label="Edit"   onClick={() => onEdit?.(user)}><Edit  className="size-5" /></button>
                    <button aria-label="Delete" onClick={() => onDelete?.(user)} className="text-red-500"><Trash className="size-5" /></button>
                </div>
            </td>
        </tr>
    )
}