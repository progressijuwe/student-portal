import { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { VENUE_TYPES } from '../../../constants/venues';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import {
	useCreateVenue,
	useUpdateVenue,
} from '../../../hooks/admin/useAdminVenues';

/**
 * One form for both creating and editing a venue.
 *
 * The fields are identical in each case and the API takes the same shape, so a
 * second near-copy of this component would only be somewhere for the two to
 * drift apart. `venue` being present is what switches the mode.
 */
export default function VenueFormModal({ venue, onClose, onSuccess }) {
	const isEditing = Boolean(venue);

	const { mutateAsync: createVenue } = useCreateVenue();
	const { mutateAsync: updateVenue } = useUpdateVenue();

	const [values, setValues] = useState({
		code: venue?.code ?? '',
		name: venue?.name ?? '',
		building: venue?.building ?? '',
		type: venue?.type ?? '',
		capacity: venue?.capacity != null ? String(venue.capacity) : '',
		is_active: venue?.is_active ?? true,
	});
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);

	const setField = (name, value) => {
		setValues((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: undefined }));
	};

	const validate = () => {
		const next = {};

		if (!values.code.trim()) next.code = 'Give the room a short code.';
		if (!values.name.trim()) next.name = 'Give the room a name.';
		if (!values.type) next.type = 'Choose a venue type.';

		const capacity = Number(values.capacity);
		if (!values.capacity || Number.isNaN(capacity) || capacity < 1) {
			next.capacity = 'Capacity must be at least 1.';
		}

		return next;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setSubmitError(null);

		const nextErrors = validate();

		if (Object.keys(nextErrors).length > 0) {
			setErrors(nextErrors);
			return;
		}

		const payload = {
			code: values.code.trim(),
			name: values.name.trim(),
			// An empty building is meaningfully "not recorded", which the column
			// stores as null rather than an empty string.
			building: values.building.trim() || null,
			type: values.type,
			capacity: Number(values.capacity),
		};

		try {
			setSubmitting(true);

			if (isEditing) {
				await updateVenue({
					venueId: venue.id,
					payload: { ...payload, is_active: values.is_active },
				});
			} else {
				await createVenue(payload);
			}

			onClose();
			// Reports which branch ran rather than leaving the caller to infer
			// it from state this has just cleared.
			onSuccess?.(isEditing);
		} catch (error) {
			setSubmitError(
				getErrorMessage(error, {
					500: 'Failed to save the venue.',
				}),
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Modal
			heading={isEditing ? 'Edit Venue' : 'Add Venue'}
			description={
				isEditing
					? 'Update this room’s details or take it out of use'
					: 'Rooms have to exist before classes can be scheduled into them'
			}
			onClose={onClose}
		>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-6 px-4 pb-4'
			>
				<div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
					<Field
						id='venue-code'
						label='Code'
						required
						value={values.code}
						onChange={(value) => setField('code', value)}
						error={errors.code}
						placeholder='e.g. LH1'
					/>

					<Field
						id='venue-name'
						label='Name'
						required
						value={values.name}
						onChange={(value) => setField('name', value)}
						error={errors.name}
						placeholder='e.g. Lecture Theatre 1'
					/>

					<Field
						id='venue-building'
						label='Building'
						value={values.building}
						onChange={(value) => setField('building', value)}
						placeholder='e.g. NMI Building'
						hint='Shown above the room on student timetables.'
					/>

					<Field
						id='venue-capacity'
						label='Capacity'
						required
						type='number'
						min={1}
						value={values.capacity}
						onChange={(value) => setField('capacity', value)}
						error={errors.capacity}
					/>

					<div className='flex flex-col gap-1.5'>
						<label
							htmlFor='venue-type'
							className='text-sm font-medium text-black'
						>
							Type
							<span aria-hidden='true' className='text-brand-red'>
								{' '}
								*
							</span>
						</label>
						<select
							id='venue-type'
							value={values.type}
							aria-invalid={errors.type ? 'true' : undefined}
							onChange={(event) =>
								setField('type', event.target.value)
							}
							className={`rounded-[5px] border px-4 py-3 text-sm focus:border-brand-orange focus:outline-none ${
								errors.type ? 'border-red-500' : 'border-border'
							}`}
						>
							<option value=''>Select a type</option>
							{VENUE_TYPES.map((type) => (
								<option key={type.value} value={type.value}>
									{type.label}
								</option>
							))}
						</select>
						{errors.type && (
							<p role='alert' className='text-xs text-red-500'>
								{errors.type}
							</p>
						)}
					</div>
				</div>

				{isEditing && (
					<div className='flex items-start gap-3'>
						<input
							id='venue-is-active'
							type='checkbox'
							checked={values.is_active}
							aria-describedby='venue-is-active-help'
							onChange={(event) =>
								setField('is_active', event.target.checked)
							}
							className='mt-1 size-4 accent-brand-red'
						/>
						<div className='flex flex-col gap-0.5'>
							<label
								htmlFor='venue-is-active'
								className='text-sm font-medium text-black'
							>
								In use
							</label>
							<p
								id='venue-is-active-help'
								className='text-xs text-label'
							>
								Taking a room out of use hides it when
								scheduling new classes. Slots already booked
								into it keep running — move those first.
							</p>
						</div>
					</div>
				)}

				{submitError && (
					<p
						role='alert'
						className='rounded-[10px] bg-red-50 px-4 py-3 text-sm text-red-600'
					>
						{submitError}
					</p>
				)}

				<div className='flex justify-end gap-3'>
					<Button
						variant='tertiary'
						onClick={onClose}
						disabled={submitting}
					>
						Cancel
					</Button>
					<Button
						type='submit'
						variant='primary'
						disabled={submitting}
					>
						{submitting
							? 'Saving…'
							: isEditing
								? 'Save Changes'
								: 'Create Venue'}
					</Button>
				</div>
			</form>
		</Modal>
	);
}

function Field({
	id,
	label,
	value,
	onChange,
	error,
	hint,
	required = false,
	type = 'text',
	...rest
}) {
	return (
		<div className='flex flex-col gap-1.5'>
			<label htmlFor={id} className='text-sm font-medium text-black'>
				{label}
				{required && (
					<span aria-hidden='true' className='text-brand-red'>
						{' '}
						*
					</span>
				)}
			</label>
			<input
				id={id}
				type={type}
				value={value}
				aria-invalid={error ? 'true' : undefined}
				onChange={(event) => onChange(event.target.value)}
				className={`rounded-[5px] border px-4 py-3 text-sm placeholder:text-sm focus:border-brand-orange focus:outline-none ${
					error ? 'border-red-500' : 'border-border'
				}`}
				{...rest}
			/>
			{hint && !error && <p className='text-xs text-label'>{hint}</p>}
			{error && (
				<p role='alert' className='text-xs text-red-500'>
					{error}
				</p>
			)}
		</div>
	);
}
