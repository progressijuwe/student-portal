import { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import SearchSelect from '../../../components/ui/SearchSelect';
import { Button } from '../../../components/ui/Button';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import { useLecturerOptions } from '../../../hooks/admin/useLecturerOptions';
import { useUpdateOffering } from '../../../hooks/admin/useAdminOfferings';
import { getErrorMessage } from '../../../utils/getErrorMessage';

/**
 * Reassign the lecturer, or open and close the offering for registration.
 *
 * The course, session and semester are shown but not editable — they are the
 * offering's identity, and enrollments, grades and timetable slots all point at
 * this row. Correcting one of those means creating the right offering and
 * closing this one, which is what the API enforces.
 */
export default function EditOfferingModal({ offering, onClose, onSuccess }) {
	const { mutateAsync: updateOffering } = useUpdateOffering();

	const [lecturerSearch, setLecturerSearch] = useState('');
	const lecturers = useLecturerOptions(useDebouncedValue(lecturerSearch));

	const [lecturerId, setLecturerId] = useState(
		offering.lecturer?.id ? String(offering.lecturer.id) : '',
	);
	const [isActive, setIsActive] = useState(offering.is_active);
	const [submitting, setSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);

	const enrolled = offering.enrolled_count ?? 0;

	const handleSubmit = async (event) => {
		event.preventDefault();
		setSubmitError(null);

		try {
			setSubmitting(true);

			await updateOffering({
				offeringId: offering.id,
				payload: {
					lecturer_id: lecturerId ? Number(lecturerId) : null,
					is_active: isActive,
				},
			});

			onClose();
			onSuccess?.();
		} catch (error) {
			setSubmitError(
				getErrorMessage(error, {
					500: 'Failed to update the course offering.',
				}),
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Modal
			heading='Edit Course Offering'
			description={`${offering.course?.code} · ${offering.session?.name} · ${
				offering.semester === 'first' ? 'First' : 'Second'
			} Semester`}
			onClose={onClose}
		>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-6 px-4 pb-4'
			>
				<dl className='grid grid-cols-1 gap-3 rounded-[10px] bg-[#F9F9FF] p-4 text-sm lg:grid-cols-3'>
					<div>
						<dt className='text-xs text-label'>Course</dt>
						<dd className='font-medium'>
							{offering.course?.title}
						</dd>
					</div>
					<div>
						<dt className='text-xs text-label'>Department</dt>
						<dd className='font-medium'>
							{offering.course?.department?.name ?? '—'}
						</dd>
					</div>
					<div>
						<dt className='text-xs text-label'>
							Students registered
						</dt>
						<dd className='font-medium'>{enrolled}</dd>
					</div>
				</dl>

				<SearchSelect
					label='Lecturer'
					search={lecturerSearch}
					onSearchChange={setLecturerSearch}
					searchPlaceholder='Search by name or staff ID…'
					options={lecturers.options}
					isPending={lecturers.isPending}
					hasMore={lecturers.hasMore}
					value={lecturerId}
					onChange={setLecturerId}
					placeholder='Not assigned yet'
					hint='Whoever is assigned here is the only person who can enter marks for this course.'
				/>

				<div className='flex items-start gap-3'>
					<input
						id='offering-is-active'
						type='checkbox'
						checked={isActive}
						aria-describedby='offering-is-active-help'
						onChange={(event) => setIsActive(event.target.checked)}
						className='mt-1 size-4 accent-brand-red'
					/>
					<div className='flex flex-col gap-0.5'>
						<label
							htmlFor='offering-is-active'
							className='text-sm font-medium text-black'
						>
							Open for registration
						</label>
						<p
							id='offering-is-active-help'
							className='text-xs text-label'
						>
							Closing this hides the course from the registration
							list. The {enrolled} student
							{enrolled === 1 ? '' : 's'} already registered keep
							their place, their marks and their timetable.
						</p>
					</div>
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
						{submitting ? 'Saving…' : 'Save Changes'}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
