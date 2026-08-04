import { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import SearchSelect from '../../../components/ui/SearchSelect';
import { Button } from '../../../components/ui/Button';
import { DAYS, toTimeInput } from '../../../constants/venues';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import { useOfferingOptions } from '../../../hooks/admin/useOfferingOptions';
import { useVenueOptions } from '../../../hooks/admin/useVenueOptions';
import {
	useCreateTimetableSlot,
	useUpdateTimetableSlot,
} from '../../../hooks/admin/useAdminTimetable';
import { getErrorMessage } from '../../../utils/getErrorMessage';

/**
 * One form for scheduling a class and for moving one.
 *
 * Clashes are the API's call, not this form's: TimetableService checks the
 * venue, the lecturer and the cohort's own department and level, and reports
 * each one under a `conflict` key. Duplicating those rules here would mean two
 * implementations disagreeing about whether a slot is legal, so the form
 * submits and surfaces whatever comes back.
 */
export default function TimetableSlotModal({ slot, onClose, onSuccess }) {
	const isEditing = Boolean(slot);

	const { mutateAsync: createSlot } = useCreateTimetableSlot();
	const { mutateAsync: updateSlot } = useUpdateTimetableSlot();

	const [offeringSearch, setOfferingSearch] = useState('');
	const [venueSearch, setVenueSearch] = useState('');

	const offerings = useOfferingOptions(useDebouncedValue(offeringSearch));
	const venues = useVenueOptions(useDebouncedValue(venueSearch));

	const [values, setValues] = useState({
		course_offering_id: slot?.course_offering?.id
			? String(slot.course_offering.id)
			: '',
		venue_id: slot?.venue?.id ? String(slot.venue.id) : '',
		day: slot?.day ?? '',
		start_time: toTimeInput(slot?.start_time),
		end_time: toTimeInput(slot?.end_time),
		is_active: slot?.is_active ?? true,
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

		if (!values.course_offering_id) {
			next.course_offering_id = 'Choose a course offering.';
		}
		if (!values.venue_id) next.venue_id = 'Choose a venue.';
		if (!values.day) next.day = 'Choose a day.';
		if (!values.start_time) next.start_time = 'Set a start time.';
		if (!values.end_time) next.end_time = 'Set an end time.';

		if (
			values.start_time &&
			values.end_time &&
			values.end_time <= values.start_time
		) {
			next.end_time = 'The class must end after it starts.';
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
			course_offering_id: Number(values.course_offering_id),
			venue_id: Number(values.venue_id),
			day: values.day,
			start_time: values.start_time,
			end_time: values.end_time,
		};

		try {
			setSubmitting(true);

			if (isEditing) {
				await updateSlot({
					slotId: slot.id,
					payload: { ...payload, is_active: values.is_active },
				});
			} else {
				await createSlot(payload);
			}

			onClose();
			onSuccess?.(isEditing);
		} catch (error) {
			setSubmitError(
				getErrorMessage(error, {
					500: 'Failed to save the timetable slot.',
				}),
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Modal
			heading={isEditing ? 'Edit Class' : 'Schedule a Class'}
			description={
				isEditing
					? 'Move this class, change its room, or cancel it'
					: 'Put a course offering in a room at a fixed time each week'
			}
			onClose={onClose}
		>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-6 px-4 pb-4'
			>
				<SearchSelect
					label='Course offering'
					required
					search={offeringSearch}
					onSearchChange={setOfferingSearch}
					searchPlaceholder='Search by course code or title…'
					options={offerings.options}
					isPending={offerings.isPending}
					hasMore={offerings.hasMore}
					value={values.course_offering_id}
					onChange={(value) => setField('course_offering_id', value)}
					placeholder='Select an offering'
					error={errors.course_offering_id}
				/>

				<SearchSelect
					label='Venue'
					required
					search={venueSearch}
					onSearchChange={setVenueSearch}
					searchPlaceholder='Search by code, name or building…'
					options={venues.options}
					isPending={venues.isPending}
					hasMore={venues.hasMore}
					value={values.venue_id}
					onChange={(value) => setField('venue_id', value)}
					placeholder='Select a venue'
					error={errors.venue_id}
				/>

				<div className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
					<div className='flex flex-col gap-1.5'>
						<label
							htmlFor='slot-day'
							className='text-sm font-medium text-black'
						>
							Day
							<span aria-hidden='true' className='text-brand-red'>
								{' '}
								*
							</span>
						</label>
						<select
							id='slot-day'
							value={values.day}
							aria-invalid={errors.day ? 'true' : undefined}
							onChange={(event) =>
								setField('day', event.target.value)
							}
							className={`rounded-[5px] border px-4 py-3 text-sm focus:border-brand-orange focus:outline-none ${
								errors.day ? 'border-red-500' : 'border-border'
							}`}
						>
							<option value=''>Select a day</option>
							{DAYS.map((day) => (
								<option key={day.value} value={day.value}>
									{day.label}
								</option>
							))}
						</select>
						{errors.day && (
							<p role='alert' className='text-xs text-red-500'>
								{errors.day}
							</p>
						)}
					</div>

					<TimeField
						id='slot-start'
						label='Starts'
						value={values.start_time}
						onChange={(value) => setField('start_time', value)}
						error={errors.start_time}
					/>

					<TimeField
						id='slot-end'
						label='Ends'
						value={values.end_time}
						onChange={(value) => setField('end_time', value)}
						error={errors.end_time}
					/>
				</div>

				{isEditing && (
					<div className='flex items-start gap-3'>
						<input
							id='slot-is-active'
							type='checkbox'
							checked={values.is_active}
							aria-describedby='slot-is-active-help'
							onChange={(event) =>
								setField('is_active', event.target.checked)
							}
							className='mt-1 size-4 accent-brand-red'
						/>
						<div className='flex flex-col gap-0.5'>
							<label
								htmlFor='slot-is-active'
								className='text-sm font-medium text-black'
							>
								Scheduled
							</label>
							<p
								id='slot-is-active-help'
								className='text-xs text-label'
							>
								Unchecking this cancels the class. It disappears
								from student and lecturer timetables and frees
								the room for that time.
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
								: 'Schedule Class'}
					</Button>
				</div>
			</form>
		</Modal>
	);
}

function TimeField({ id, label, value, onChange, error }) {
	return (
		<div className='flex flex-col gap-1.5'>
			<label htmlFor={id} className='text-sm font-medium text-black'>
				{label}
				<span aria-hidden='true' className='text-brand-red'>
					{' '}
					*
				</span>
			</label>
			<input
				id={id}
				type='time'
				value={value}
				aria-invalid={error ? 'true' : undefined}
				onChange={(event) => onChange(event.target.value)}
				className={`rounded-[5px] border px-4 py-3 text-sm focus:border-brand-orange focus:outline-none ${
					error ? 'border-red-500' : 'border-border'
				}`}
			/>
			{error && (
				<p role='alert' className='text-xs text-red-500'>
					{error}
				</p>
			)}
		</div>
	);
}
