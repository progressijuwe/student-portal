import { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import SearchSelect from '../../../components/ui/SearchSelect';
import { Button } from '../../../components/ui/Button';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import { useAcademicSessions } from '../../../hooks/useAcademicSessions';
import { useCourseOptions } from '../../../hooks/admin/useCourseOptions';
import { useLecturerOptions } from '../../../hooks/admin/useLecturerOptions';
import { useCreateOffering } from '../../../hooks/admin/useAdminOfferings';
import { getErrorMessage } from '../../../utils/getErrorMessage';

const SEMESTERS = [
	{ value: 'first', label: 'First Semester' },
	{ value: 'second', label: 'Second Semester' },
];

/**
 * Creates the row that lets a course actually be registered for.
 *
 * The lecturer is optional here on purpose: timetabling a course before staff
 * are assigned is normal, and the API allows a null lecturer. It can be filled
 * in later from the edit modal — but until it is, nobody can enter marks, which
 * is why the offerings table flags unassigned rows.
 */
export default function AddOfferingModal({ onClose, onSuccess }) {
	const { data: sessions = [] } = useAcademicSessions();
	const { mutateAsync: createOffering } = useCreateOffering();

	const [courseSearch, setCourseSearch] = useState('');
	const [lecturerSearch, setLecturerSearch] = useState('');

	const courses = useCourseOptions(useDebouncedValue(courseSearch));
	const lecturers = useLecturerOptions(useDebouncedValue(lecturerSearch));

	// The session an admin almost always means is the current one.
	const currentSessionId = sessions.find((session) => session.is_current)?.id;

	const [values, setValues] = useState({
		course_id: '',
		academic_session_id: '',
		semester: '',
		lecturer_id: '',
	});
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);

	// Seeded during render rather than from an effect so the select is never
	// briefly blank on open.
	const [isSeeded, setIsSeeded] = useState(false);

	if (!isSeeded && currentSessionId) {
		setIsSeeded(true);
		setValues((prev) => ({
			...prev,
			academic_session_id: String(currentSessionId),
		}));
	}

	const setField = (name, value) => {
		setValues((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: undefined }));
	};

	const validate = () => {
		const next = {};

		if (!values.course_id) next.course_id = 'Choose a course.';
		if (!values.academic_session_id) {
			next.academic_session_id = 'Choose an academic session.';
		}
		if (!values.semester) next.semester = 'Choose a semester.';

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

		try {
			setSubmitting(true);

			await createOffering({
				course_id: Number(values.course_id),
				academic_session_id: Number(values.academic_session_id),
				semester: values.semester,
				// An empty select means "not assigned yet", which the API
				// expects as null rather than an empty string.
				lecturer_id: values.lecturer_id
					? Number(values.lecturer_id)
					: null,
			});

			onClose();
			onSuccess?.();
		} catch (error) {
			// The API's duplicate-offering check reports on course_id, and
			// getErrorMessage surfaces the first field error, so "This course is
			// already offered in this session and semester." reaches the admin
			// verbatim instead of a generic failure.
			setSubmitError(
				getErrorMessage(error, {
					500: 'Failed to create the course offering.',
				}),
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Modal
			heading='Add Course Offering'
			description='Run a course in a session and semester so students can register for it'
			onClose={onClose}
		>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-6 px-4 pb-4'
			>
				<div className='flex flex-col gap-5'>
					<SearchSelect
						label='Course'
						required
						search={courseSearch}
						onSearchChange={setCourseSearch}
						searchPlaceholder='Search by course code or title…'
						options={courses.options}
						isPending={courses.isPending}
						hasMore={courses.hasMore}
						value={values.course_id}
						onChange={(value) => setField('course_id', value)}
						placeholder='Select a course'
						error={errors.course_id}
					/>

					<div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
						<div className='flex flex-col gap-1.5'>
							<label
								htmlFor='offering-session'
								className='text-sm font-medium text-black'
							>
								Academic Session
								<span
									aria-hidden='true'
									className='text-brand-red'
								>
									{' '}
									*
								</span>
							</label>
							<select
								id='offering-session'
								value={values.academic_session_id}
								aria-invalid={
									errors.academic_session_id
										? 'true'
										: undefined
								}
								onChange={(event) =>
									setField(
										'academic_session_id',
										event.target.value,
									)
								}
								className={`rounded-[5px] border px-4 py-3 text-sm focus:border-brand-orange focus:outline-none ${
									errors.academic_session_id
										? 'border-red-500'
										: 'border-border'
								}`}
							>
								<option value=''>Select a session</option>
								{sessions.map((session) => (
									<option key={session.id} value={session.id}>
										{session.name}
										{session.is_current ? ' (current)' : ''}
									</option>
								))}
							</select>
							{errors.academic_session_id && (
								<p
									role='alert'
									className='text-xs text-red-500'
								>
									{errors.academic_session_id}
								</p>
							)}
						</div>

						<div className='flex flex-col gap-1.5'>
							<label
								htmlFor='offering-semester'
								className='text-sm font-medium text-black'
							>
								Semester
								<span
									aria-hidden='true'
									className='text-brand-red'
								>
									{' '}
									*
								</span>
							</label>
							<select
								id='offering-semester'
								value={values.semester}
								aria-invalid={
									errors.semester ? 'true' : undefined
								}
								onChange={(event) =>
									setField('semester', event.target.value)
								}
								className={`rounded-[5px] border px-4 py-3 text-sm focus:border-brand-orange focus:outline-none ${
									errors.semester
										? 'border-red-500'
										: 'border-border'
								}`}
							>
								<option value=''>Select a semester</option>
								{SEMESTERS.map((semester) => (
									<option
										key={semester.value}
										value={semester.value}
									>
										{semester.label}
									</option>
								))}
							</select>
							{errors.semester && (
								<p
									role='alert'
									className='text-xs text-red-500'
								>
									{errors.semester}
								</p>
							)}
						</div>
					</div>

					<SearchSelect
						label='Lecturer'
						search={lecturerSearch}
						onSearchChange={setLecturerSearch}
						searchPlaceholder='Search by name or staff ID…'
						options={lecturers.options}
						isPending={lecturers.isPending}
						hasMore={lecturers.hasMore}
						value={values.lecturer_id}
						onChange={(value) => setField('lecturer_id', value)}
						placeholder='Not assigned yet'
						hint='Optional — you can assign a lecturer later, but marks cannot be entered until you do.'
					/>
				</div>

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
						{submitting ? 'Creating…' : 'Create Offering'}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
