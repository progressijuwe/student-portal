import { useState, useEffect } from 'react';
import Person from '../../assets/svg/person.svg?react';
import Camera from '../../assets/svg/camera2.svg?react';
import { Button } from '../ui/Button';

export default function UserForm({
	fields,
	initialData,
	onSubmit,
	onCancel,
	submitLabel = 'Save',
	departments = [],
}) {
	const [preview, setPreview] = useState(null);
	const [values, setValues] = useState({});
	const [touched, setTouched] = useState({});
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);

	// Build faculty list + faculty->department map from real data
	const faculties = departments.map((f) => ({ id: f.id, name: f.name }));
	const facultyDepartments = departments.reduce((acc, faculty) => {
		acc[faculty.id] = faculty.departments || [];
		return acc;
	}, {});

	useEffect(() => {
		const data = initialData || {};
		const initialValues = {};
		fields.forEach((field) => {
			initialValues[field.name] = data[field.name] || '';
		});
		setValues(initialValues);
		setPreview(data.profilePhoto || null);
	}, [initialData, fields]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setValues((prev) => {
			const updated = { ...prev, [name]: value };
			if (name === 'faculty_id') {
				updated.department_id = '';
			}
			return updated;
		});

		const field = fields.find((f) => f.name === name);
		const error = validateField(field, value);

		setErrors((prev) => {
			const updated = { ...prev };
			if (error) updated[name] = error;
			else delete updated[name];
			return updated;
		});
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;
		const imageUrl = URL.createObjectURL(file);
		setPreview(imageUrl);
		setValues((prev) => ({ ...prev, photo: file }));
	};

	const validateField = (field, value) => {
		if (field.required && !value) {
			return `${field.label} is required`;
		}
		if (field.validate && value) {
			return field.validate(value);
		}
		return null;
	};

	const validate = () => {
		const newErrors = {};
		fields.forEach((field) => {
			const value = values[field.name];
			const error = validateField(field, value);
			if (error) newErrors[field.name] = error;
		});
		return newErrors;
	};

	const handleBlur = (e) => {
		const { name, value } = e.target;
		const field = fields.find((f) => f.name === name);
		if (!field) return;
		const error = validateField(field, value);
		setTouched((prev) => ({ ...prev, [name]: true }));
		setErrors((prev) => {
			const updated = { ...prev };
			if (error) updated[name] = error;
			else delete updated[name];
			return updated;
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = validate();

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			const allTouched = {};
			fields.forEach((field) => {
				allTouched[field.name] = true;
			});
			setTouched(allTouched);
			return;
		}
		try {
			setSubmitting(true);
			await onSubmit(values);
		} catch (err) {
			console.error(err);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col justify-center items-center py-4 px-4 gap-6'
		>
			<div className='flex flex-col items-center gap-1'>
				<label
					htmlFor='user-photo'
					className='relative cursor-pointer bg-[#F9F9FF] border border-border w-fit rounded-full p-2 flex justify-center'
				>
					{preview ? (
						<img
							src={preview}
							alt='Profile'
							className='size-16 rounded-full object-cover'
						/>
					) : (
						<Person className='[&_path]:fill-transparent [&_path]:stroke-label size-16 stroke-2' />
					)}
					<span className='p-1 bg-brand-red rounded-[5px] absolute bottom-0 right-0 cursor-pointer'>
						<Camera className='size-3' />
						<input
							type='file'
							id='user-photo'
							name='photo'
							className='hidden'
							onChange={handleFileChange}
						/>
					</span>
				</label>
				<p className='font-semibold text-sm text-label'>
					Upload profile photo
				</p>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-5 max-w-170 w-full'>
				{fields.map((field) => (
					<div key={field.id} className='flex flex-col gap-2'>
						<label
							htmlFor={field.id}
							className='text-sm font-medium'
						>
							{field.label}
						</label>
						{field.type === 'select' ? (
							<select
								id={field.id}
								name={field.name}
								value={values[field.name] || ''}
								disabled={
									field.name === 'department_id' &&
									!values.faculty_id
								}
								onBlur={handleBlur}
								onChange={handleChange}
								className={`border focus:border-brand-orange rounded-[5px] text-sm px-5 py-3 ${
									errors[field.name]
										? 'border-red-500'
										: 'border-border'
								}`}
							>
								<option value=''>Select</option>
								{field.name === 'faculty_id'
									? faculties.map((f) => (
											<option key={f.id} value={f.id}>
												{f.name}
											</option>
										))
									: field.name === 'department_id'
										? (
												facultyDepartments[
													values.faculty_id
												] || []
											).map((d) => (
												<option key={d.id} value={d.id}>
													{d.name}
												</option>
											))
										: (field.options || []).map((opt) => (
												<option key={opt} value={opt}>
													{opt}
												</option>
											))}
							</select>
						) : (
							<input
								id={field.id}
								name={field.name}
								type={field.type}
								placeholder={field.placeholder}
								value={values[field.name] || ''}
								onBlur={handleBlur}
								onChange={handleChange}
								className={`border focus:border-brand-orange rounded-[5px] text-sm placeholder:text-sm px-5 py-3 ${
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
				))}
			</div>

			<div className='flex gap-4 justify-end w-full px-0 lg:px-8'>
				<Button
					type='button'
					variant='tertiary'
					onClick={onCancel}
					disabled={submitting}
				>
					Cancel
				</Button>
				<Button type='submit' variant='primary' disabled={submitting}>
					{submitting ? 'Saving...' : submitLabel}
				</Button>
			</div>
		</form>
	);
}
