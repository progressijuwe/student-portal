import { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import Warning from '../../../assets/svg/warningIcon.svg?react';
import { Button } from '../../../components/ui/Button';

export default function DeleteUserModal({
	onClose,
	onConfirm,
	description,
	heading,
}) {
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			setSubmitting(true);
			await onConfirm();
		} catch (err) {
			setError(
				err.response?.data?.message ??
					'Failed to delete. Please try again.',
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Modal
			onClose={onClose}
			Icon={<Warning />}
			heading={heading}
			className='max-w-140'
		>
			<form
				onSubmit={handleSubmit}
				className='w-full flex flex-col gap-5 items-center mx-auto'
			>
				<div className='flex flex-col gap-6 w-full items-center'>
					<p className='font-medium text-label text-xs lg:text-sm'>
						{description}
					</p>
					<span className='bg-[#FFEFEF] pl-5 pr-1.5 border-l-5 border-[#FF0000] py-2.5 font-medium text-xs lg:text-sm text-[#FF0000]'>
						<span className='font-semibold'>Warning: </span>This
						action cannot be undone.
					</span>
					{error && (
						<p className='text-red-500 text-xs text-center'>
							{error}
						</p>
					)}
				</div>
				<div className='w-full flex justify-end gap-4'>
					<Button type='button' variant='tertiary' onClick={onClose}>
						Cancel
					</Button>
					<Button
						type='submit'
						disabled={submitting}
						variant='delete'
					>
						{submitting ? 'Deleting...' : 'Delete Permanently'}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
