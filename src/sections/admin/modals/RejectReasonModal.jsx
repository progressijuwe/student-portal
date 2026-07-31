import { useId, useState } from 'react';
import Modal from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';

/**
 * Collects the mandatory rejection reason before results are sent back to a
 * lecturer. The API rejects the request without one, and the lecturer sees this
 * text on their results page — so it is the whole point of the interaction, not
 * a formality.
 */
export default function RejectReasonModal({
	title = 'Reject results',
	description,
	isSubmitting = false,
	error,
	onConfirm,
	onClose,
}) {
	const [reason, setReason] = useState('');
	const fieldId = useId();

	const trimmed = reason.trim();
	const tooLong = trimmed.length > 500;
	const canSubmit = trimmed.length > 0 && !tooLong && !isSubmitting;

	const handleSubmit = (event) => {
		event.preventDefault();

		if (canSubmit) onConfirm(trimmed);
	};

	return (
		<Modal onClose={onClose} heading={title} description={description}>
			<form onSubmit={handleSubmit} className='flex flex-col gap-4 p-1'>
				<div className='flex flex-col gap-2'>
					<label
						htmlFor={fieldId}
						className='text-sm font-medium text-dark'
					>
						Reason for rejection
					</label>
					<textarea
						id={fieldId}
						value={reason}
						onChange={(event) => setReason(event.target.value)}
						rows={4}
						required
						maxLength={500}
						aria-describedby={`${fieldId}-hint`}
						placeholder='Explain what needs to be corrected…'
						className='w-full resize-y rounded-lg border border-border px-3 py-2 text-sm focus-visible:border-brand-orange focus-visible:outline-2 focus-visible:outline-brand-border'
					/>
					<p id={`${fieldId}-hint`} className='text-xs text-label'>
						{trimmed.length}/500 — the lecturer will see this.
					</p>
				</div>

				{error && (
					<p role='alert' className='text-sm text-red-600'>
						{error}
					</p>
				)}

				<div className='flex justify-end gap-3'>
					<Button type='button' variant='secondary' onClick={onClose}>
						Cancel
					</Button>
					<Button
						type='submit'
						variant='primary'
						disabled={!canSubmit}
					>
						{isSubmitting ? 'Rejecting…' : 'Reject results'}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
