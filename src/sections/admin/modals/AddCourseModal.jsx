import Modal from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { useState } from 'react';
import { courseFields } from '../../../constants/courseFields';
import { useDepartments } from '../../../hooks/useDepartments';
import { useCreateCourse } from '../../../hooks/admin/useCreateCourse';

const initialValues = {
	code: '',
	credit_units: '',
	title: '',
	department_id: '',
	level: '',
	type: '',
	semester: '',
	description: '',
};

export default function AddCourseModal({ onClose, onSuccess }) {
	const { data: departments = [] } = useDepartments();
	const { mutateAsync: createCourse } = useCreateCourse();

	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);

	// Flatten faculties -> departments into a single list of { id, name }
	const departmentOptions = departments.flatMap((faculty) =>
		(faculty.departments || []).map((dept) => ({
			id: dept.id,
			name: dept.name,
		})),
	);

	const requiredFields = courseFields.filter((f) => f.name !== 'description');

	const validate = (vals) => {
		const errs = {};
		requiredFields.forEach((f) => {
			if (!vals[f.name]) errs[f.name] = `${f.label} is required`;
		});
		return errs;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues((prev) => ({ ...prev, [name]: value }));
		if (touched[name]) {
			const errs = validate({ ...values, [name]: value });
			setErrors((prev) => ({ ...prev, [name]: errs[name] || undefined }));
		}
	};

	const handleBlur = (e) => {
		const { name } = e.target;
		setTouched((prev) => ({ ...prev, [name]: true }));
		const errs = validate(values);
		setErrors((prev) => ({ ...prev, [name]: errs[name] || undefined }));
	};

	const getOptionsFor = (field) => {
		if (field.name === 'department_id') {
			return departmentOptions.map((d) => ({
				value: d.id,
				label: d.name,
			}));
		}
		// Normalize plain-string options into { value, label } too
		return (field.options || []).map((opt) =>
			typeof opt === 'string' ? { value: opt, label: opt } : opt,
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitError(null);

		const errs = validate(values);
		if (Object.keys(errs).length > 0) {
			setErrors(errs);
			setTouched(
				Object.fromEntries(requiredFields.map((f) => [f.name, true])),
			);
			return;
		}
		try {
			setSubmitting(true);
			await createCourse({
				...values,
				credit_units: Number(values.credit_units),
			});
			onClose();
			onSuccess?.();
		} catch (err) {
			setSubmitError(
				err.response?.data?.message ?? 'Failed to create course.',
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Modal
			heading='Add New Course'
			description='Fill in course details below'
			onClose={onClose}
		>
			<form
				onSubmit={handleSubmit}
				className='px-4 pb-4 flex flex-col gap-6'
			>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-5'>
					{courseFields.map((field) => (
						<div
							key={field.id}
							className={
								field.colSpan === 2 ? 'lg:col-span-2' : ''
							}
						>
							<div className='flex flex-col gap-2'>
								<label
									htmlFor={field.id}
									className='text-sm font-medium text-black'
								>
									{field.label}
								</label>
								{field.type === 'select' ? (
									<select
										id={field.id}
										name={field.name}
										value={values[field.name]}
										onChange={handleChange}
										onBlur={handleBlur}
										className={`border rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:border-brand-orange ${
											touched[field.name] &&
											errors[field.name]
												? 'border-red-500'
												: 'border-border'
										}`}
									>
										<option value=''>
											{field.placeholder}
										</option>
										{getOptionsFor(field).map((opt) => (
											<option
												key={opt.value}
												value={opt.value}
											>
												{opt.label}
											</option>
										))}
									</select>
								) : (
									<input
										id={field.id}
										name={field.name}
										type={field.type}
										placeholder={field.placeholder}
										value={values[field.name]}
										onChange={handleChange}
										onBlur={handleBlur}
										className={`border rounded-[10px] px-4 py-3 text-sm focus:outline-none focus:border-brand-orange ${
											touched[field.name] &&
											errors[field.name]
												? 'border-red-500'
												: 'border-border'
										}`}
									/>
								)}
								{touched[field.name] && errors[field.name] && (
									<p className='text-red-500 text-xs'>
										{errors[field.name]}
									</p>
								)}
							</div>
						</div>
					))}
				</div>

				{submitError && (
					<p className='text-red-500 text-sm'>{submitError}</p>
				)}

				<div className='flex justify-end gap-3'>
					<Button
						type='button'
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
						{submitting ? 'Adding...' : 'Add Course'}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
