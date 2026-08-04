import { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import {
	useCreateSession,
	useUpdateSession,
} from '../../../hooks/admin/useAdminSessions';

/**
 * One form for creating and editing an academic session.
 *
 * Note what is absent: nothing here promotes a session to current. Rolling the
 * portal over moves every role's view of the system at once, so it is a
 * separate, explicit action rather than something that can happen while fixing
 * a date.
 */
export default function SessionFormModal({ session, onClose, onSuccess }) {
	const isEditing = Boolean(session);

	const { mutateAsync: createSession } = useCreateSession();
	const { mutateAsync: updateSession } = useUpdateSession();

	// A new session almost always follows the last one, so the years are
	// pre-filled from today and the name derived from them. All still editable.
	const defaultStart = new Date().getFullYear();

	const [values, setValues] = useState({
		name: session?.name ?? `${defaultStart}/${defaultStart + 1}`,
		start_year: String(session?.start_year ?? defaultStart),
		end_year: String(session?.end_year ?? defaultStart + 1),
		first_semester_start: session?.first_semester_start ?? '',
		first_semester_end: session?.first_semester_end ?? '',
		second_semester_start: session?.second_semester_start ?? '',
		second_semester_end: session?.second_semester_end ?? '',
	});
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);

	const setField = (name, value) => {
		setValues((prev) => {
			const next = { ...prev, [name]: value };

			// Keep the name in step with the years while creating, so the
			// common case needs no typing — but never overwrite a name the
			// admin has already set on an existing session.
			if (!isEditing && (name === 'start_year' || name === 'end_year')) {
				next.name = `${next.start_year}/${next.end_year}`;
			}

			return next;
		});
		setErrors((prev) => ({ ...prev, [name]: undefined }));
	};

	const validate = () => {
		const next = {};

		if (!values.name.trim()) next.name = 'Give the session a name.';

		const start = Number(values.start_year);
		const end = Number(values.end_year);

		if (!/^\d{4}$/.test(values.start_year)) {
			next.start_year = 'Enter a four-digit year.';
		}
		if (!/^\d{4}$/.test(values.end_year)) {
			next.end_year = 'Enter a four-digit year.';
		} else if (end <= start) {
			next.end_year = 'The end year must be after the start year.';
		}

		const dates = [
			['first_semester_start', 'Set when the first semester starts.'],
			['first_semester_end', 'Set when the first semester ends.'],
			['second_semester_start', 'Set when the second semester starts.'],
			['second_semester_end', 'Set when the second semester ends.'],
		];

		for (const [field, message] of dates) {
			if (!values[field]) next[field] = message;
		}

		// Ordering is checked here as well as server-side so the admin sees
		// which date is wrong without a round trip.
		if (
			values.first_semester_start &&
			values.first_semester_end &&
			values.first_semester_end <= values.first_semester_start
		) {
			next.first_semester_end =
				'The first semester must end after it starts.';
		}
		if (
			values.first_semester_end &&
			values.second_semester_start &&
			values.second_semester_start <= values.first_semester_end
		) {
			next.second_semester_start =
				'The second semester must start after the first one ends.';
		}
		if (
			values.second_semester_start &&
			values.second_semester_end &&
			values.second_semester_end <= values.second_semester_start
		) {
			next.second_semester_end =
				'The second semester must end after it starts.';
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
			name: values.name.trim(),
			start_year: Number(values.start_year),
			end_year: Number(values.end_year),
			first_semester_start: values.first_semester_start,
			first_semester_end: values.first_semester_end,
			second_semester_start: values.second_semester_start,
			second_semester_end: values.second_semester_end,
		};

		try {
			setSubmitting(true);

			if (isEditing) {
				await updateSession({ sessionId: session.id, payload });
			} else {
				await createSession(payload);
			}

			onClose();
			onSuccess?.(isEditing);
		} catch (error) {
			setSubmitError(
				getErrorMessage(error, {
					500: 'Failed to save the academic session.',
				}),
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Modal
			heading={
				isEditing ? 'Edit Academic Session' : 'Add Academic Session'
			}
			description={
				isEditing
					? 'Correct this session’s name, years or semester dates'
					: 'Set up the next academic year. It will not become current until you switch to it.'
			}
			onClose={onClose}
		>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-6 px-4 pb-4'
			>
				<div className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
					<Field
						id='session-start-year'
						label='Start year'
						required
						type='number'
						value={values.start_year}
						onChange={(value) => setField('start_year', value)}
						error={errors.start_year}
					/>
					<Field
						id='session-end-year'
						label='End year'
						required
						type='number'
						value={values.end_year}
						onChange={(value) => setField('end_year', value)}
						error={errors.end_year}
					/>
					<Field
						id='session-name'
						label='Name'
						required
						value={values.name}
						onChange={(value) => setField('name', value)}
						error={errors.name}
						hint='Shown in every session picker.'
					/>
				</div>

				<fieldset className='flex flex-col gap-4 rounded-[10px] border border-border p-4'>
					<legend className='px-1 text-sm font-semibold text-black'>
						Semester dates
					</legend>
					<p className='text-xs text-label'>
						These decide which semester the portal treats as
						current, so results, registration and timetables all
						follow them.
					</p>

					<div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
						<Field
							id='first-start'
							label='First semester starts'
							required
							type='date'
							value={values.first_semester_start}
							onChange={(value) =>
								setField('first_semester_start', value)
							}
							error={errors.first_semester_start}
						/>
						<Field
							id='first-end'
							label='First semester ends'
							required
							type='date'
							value={values.first_semester_end}
							onChange={(value) =>
								setField('first_semester_end', value)
							}
							error={errors.first_semester_end}
						/>
						<Field
							id='second-start'
							label='Second semester starts'
							required
							type='date'
							value={values.second_semester_start}
							onChange={(value) =>
								setField('second_semester_start', value)
							}
							error={errors.second_semester_start}
						/>
						<Field
							id='second-end'
							label='Second semester ends'
							required
							type='date'
							value={values.second_semester_end}
							onChange={(value) =>
								setField('second_semester_end', value)
							}
							error={errors.second_semester_end}
						/>
					</div>
				</fieldset>

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
								: 'Create Session'}
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
				className={`rounded-[5px] border px-4 py-3 text-sm focus:border-brand-orange focus:outline-none ${
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
