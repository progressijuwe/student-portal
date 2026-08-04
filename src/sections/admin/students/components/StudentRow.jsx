import Eye from '../../../../assets/svg/view.svg?react';
import Edit from '../../../../assets/svg/editIcon.svg?react';
import Trash from '../../../../assets/svg/trash.svg?react';
import EmailIcon from '../../../../assets/svg/email.svg?react';
import PhoneIcon from '../../../../assets/svg/phone.svg?react';

export default function StudentRow({ student, onView, onEdit, onDelete }) {
	return (
		<tr className='border-t border-border text-sm'>
			<td className='py-4 px-2 font-semibold'>{student.id}</td>
			<td className='py-4 px-2'>
				<p className='font-medium text-black'>{student.name}</p>
				{/* Nothing is emailed, so this badge is how a locked-out
				    student becomes visible to the admin at all. */}
				{student.resetRequestedAt && (
					<span className='mt-1 inline-block rounded-[10px] bg-[#FFF7ED] px-2 py-0.5 text-xs font-medium text-[#9F0712]'>
						Reset requested
					</span>
				)}
			</td>
			<td className='py-4 px-2 text-label font-medium'>
				<span className='flex items-center gap-1'>
					<EmailIcon className='size-4' /> {student.email}
				</span>
				<span className='flex items-center gap-1'>
					<PhoneIcon className='size-4' /> {student.phone}
				</span>
			</td>
			<td className='py-4 px-2 font-medium'>{student.department}</td>
			<td className='py-4 px-2 font-medium'>{student.level}</td>
			<td className='py-4 px-2 font-medium text-center'>
				{student.enrollmentYear}
			</td>
			<td className='py-4 px-2'>
				<div className='flex justify-center gap-2.5'>
					<button aria-label='View' onClick={() => onView(student)}>
						<Eye className='size-5 [&_path]:stroke-label' />
					</button>
					<button aria-label='Edit' onClick={() => onEdit(student)}>
						<Edit className='size-5' />
					</button>
					<button
						aria-label='Delete'
						onClick={() => onDelete(student)}
						className='text-red-500'
					>
						<Trash className='size-5' />
					</button>
				</div>
			</td>
		</tr>
	);
}
