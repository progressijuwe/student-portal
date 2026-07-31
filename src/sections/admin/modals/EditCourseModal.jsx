import { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { useDepartments } from '../../../hooks/useDepartments';
import { useUpdateCourse } from '../../../hooks/admin/useAdminCourses';
import { getErrorMessage } from '../../../utils/getErrorMessage';

const LEVELS = ['100', '200', '300', '400', '500'];
const SEMESTERS = [
	{ value: 'first', label: 'First' },
	{ value: 'second', label: 'Second' },
];
const TYPES = [
	{ value: 'compulsory', label: 'Compulsory' },
	{ value: 'elective', label: 'Elective' },
];

export default function EditCourseModal({ course, onClose, onSuccess }) {
	const { data: faculties = [] } = useDepartments();
	const { mutateAsync: updateCourse, isPending } = useUpdateCourse();

	// Seeded from the CourseResource shape the list endpoint returns.
	const [values, setValues] = useState({
		code: course?.code ?? '',
		title: course?.title ?? '',
		credit_units: String(course?.credit_units ?? ''),
		level: String(course?.level ?? ''),
		semester: course?.semester ?? '',
		type: course?.type ?? '',
		department_id: String(course?.department?.id ?? ''),
		description: course?.description ?? '',
	});

	const [errors, setErrors] = useState({});
	const [submitError, setSubmitError] = useState(null);

	const departments = faculties.flatMap(
		(faculty) => faculty.departments ?? [],
	);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues((previous) => ({ ...previous, [name]: value }));
		setErrors((previous) => ({ ...previous, [name]: undefined }));
	};

	const validate = () => {
		const next = {};

		if (!values.code.trim()) next.code = 'Course code is required';
		if (!values.title.trim()) next.title = 'Title is required';
		if (!values.credit_units)
			next.credit_units = 'Credit units are required';
		if (!values.level) next.level = 'Level is required';
		if (!values.semester) next.semester = 'Semester is required';
		if (!values.type) next.type = 'Type is required';
		if (!values.department_id)
			next.department_id = 'Department is required';

		return next;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setSubmitError(null);

		const found = validate();

		if (Object.keys(found).length > 0) {
			setErrors(found);
			return;
		}

		try {
			await updateCourse({
				courseId: course.id,
				payload: {
					code: values.code.trim(),
					title: values.title.trim(),
					credit_units: Number(values.credit_units),
					level: values.level,
					semester: values.semester,
					type: values.type,
					department_id: Number(values.department_id),
					description: values.description || null,
				},
			});

			onClose();
			onSuccess();
		} catch (requestError) {
			// Surface the API's field errors rather than swallowing them into a
			// console.error, which is what the previous stub did.
			setErrors(
				Object.fromEntries(
					Object.entries(
						requestError.response?.data?.errors ?? {},
					).map(([field, messages]) => [field, messages[0]]),
				),
			);
			setSubmitError(getErrorMessage(requestError));
		}
	};

	const field = (name, label, input) => (
		<div className='flex flex-col gap-2'>
			<label htmlFor={name} className='text-sm font-medium text-black'>
				{label}
			</label>
			{input}
			{errors[name] && (
				<p className='text-xs text-red-500'>{errors[name]}</p>
			)}
		</div>
	);

	const inputClass = (name) =>
		`rounded-[10px] border px-4 py-3 text-sm focus-visible:border-brand-orange focus-visible:outline-2 focus-visible:outline-brand-border ${
			errors[name] ? 'border-red-500' : 'border-border'
		}`;

	return (
		<Modal
			heading='Edit Course'
			description='Update course details'
			onClose={onClose}
		>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-6 px-4 pb-4'
			>
				{submitError && (
					<p role='alert' className='text-sm text-red-600'>
						{submitError}
					</p>
				)}

				<div className='grid grid-cols-1 gap-x-8 gap-y-5 lg:grid-cols-2'>
					{field(
						'code',
						'Course Code',
						<input
							id='code'
							name='code'
							value={values.code}
							onChange={handleChange}
							className={inputClass('code')}
						/>,
					)}

					{field(
						'title',
						'Course Title',
						<input
							id='title'
							name='title'
							value={values.title}
							onChange={handleChange}
							className={inputClass('title')}
						/>,
					)}

					{field(
						'credit_units',
						'Credit Units',
						<input
							id='credit_units'
							name='credit_units'
							type='number'
							min='1'
							max='6'
							value={values.credit_units}
							onChange={handleChange}
							className={inputClass('credit_units')}
						/>,
					)}

					{field(
						'level',
						'Level',
						<select
							id='level'
							name='level'
							value={values.level}
							onChange={handleChange}
							className={inputClass('level')}
						>
							<option value=''>Select level</option>
							{LEVELS.map((level) => (
								<option key={level} value={level}>
									{level}
								</option>
							))}
						</select>,
					)}

					{field(
						'semester',
						'Semester',
						<select
							id='semester'
							name='semester'
							value={values.semester}
							onChange={handleChange}
							className={inputClass('semester')}
						>
							<option value=''>Select semester</option>
							{SEMESTERS.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>,
					)}

					{field(
						'type',
						'Type',
						<select
							id='type'
							name='type'
							value={values.type}
							onChange={handleChange}
							className={inputClass('type')}
						>
							<option value=''>Select type</option>
							{TYPES.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>,
					)}

					<div className='lg:col-span-2'>
						{field(
							'department_id',
							'Department',
							<select
								id='department_id'
								name='department_id'
								value={values.department_id}
								onChange={handleChange}
								className={`w-full ${inputClass('department_id')}`}
							>
								<option value=''>Select department</option>
								{departments.map((department) => (
									<option
										key={department.id}
										value={department.id}
									>
										{department.name}
									</option>
								))}
							</select>,
						)}
					</div>

					<div className='lg:col-span-2'>
						{field(
							'description',
							'Description (optional)',
							<textarea
								id='description'
								name='description'
								rows={3}
								maxLength={1000}
								value={values.description}
								onChange={handleChange}
								className={`w-full resize-y ${inputClass('description')}`}
							/>,
						)}
					</div>
				</div>

				<div className='flex justify-end gap-3'>
					<Button
						type='button'
						variant='tertiary'
						onClick={onClose}
						disabled={isPending}
					>
						Cancel
					</Button>
					<Button
						type='submit'
						variant='primary'
						disabled={isPending}
					>
						{isPending ? 'Updating…' : 'Update Course'}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
