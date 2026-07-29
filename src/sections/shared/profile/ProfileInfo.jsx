import Person from '../../../assets/svg/person.svg?react';

const EDITABLE_FIELDS = [
	{ key: 'phone', label: 'phone number', type: 'text' },
	{ key: 'address', label: 'address', type: 'text' },
	{ key: 'dob', label: 'date of birth', type: 'date' },
	{
		key: 'emergencyContactName',
		label: 'emergency contact name',
		type: 'text',
	},
	{
		key: 'emergencyContactNumber',
		label: 'emergency contact phone',
		type: 'text',
	},
];

const LECTURER_FIELDS = [
	{
		key: 'prefix',
		label: 'prefix',
		type: 'select',
		options: ['Dr.', 'Prof.', 'Mr.', 'Mrs.', 'Ms.', 'Engr.', 'Rev.'],
	},
	{
		key: 'highestQualification',
		label: 'highest qualification',
		type: 'text',
	},
	{ key: 'specialization', label: 'specialization', type: 'text' },
];

export default function ProfileInfo({
	user,
	isEditing,
	formValues,
	onFieldChange,
}) {
	const isLecturer = user.role === 'lecturer';

	if (isEditing) {
		const fields = isLecturer
			? [...LECTURER_FIELDS, ...EDITABLE_FIELDS]
			: EDITABLE_FIELDS;

		return (
			<div className='flex flex-col gap-2 lg:gap-3 w-full'>
				<span className='flex items-center gap-2.5'>
					<Person className='size-5 lg:size-6' />
					<h3 className='font-semibold text-sm lg:text-xl text-black'>
						Personal Information
					</h3>
				</span>

				<div className='bg-white w-full p-5 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-5'>
					<div className='flex flex-col gap-1 text-xs lg:text-sm sm:col-span-2'>
						<label className='uppercase text-label font-medium'>
							full name
						</label>
						<p className='text-black font-semibold'>
							{user.prefix ? `${user.prefix} ` : ''}
							{user.name}
						</p>
					</div>
					<div className='flex flex-col gap-1 text-xs lg:text-sm sm:col-span-2'>
						<label className='uppercase text-label font-medium'>
							school email
						</label>
						<p className='text-black font-semibold'>{user.email}</p>
					</div>
					{fields.map((field) => (
						<div
							key={field.key}
							className='flex flex-col gap-1 text-xs lg:text-sm'
						>
							<label
								className='uppercase text-label font-medium'
								htmlFor={field.key}
							>
								{field.label}
							</label>
							{field.type === 'select' ? (
								<select
									id={field.key}
									value={formValues[field.key] ?? ''}
									onChange={(e) =>
										onFieldChange(field.key, e.target.value)
									}
									className='border border-brand-orange rounded-sm px-3 py-2 text-sm bg-white'
								>
									<option value='' disabled>
										Select {field.label}
									</option>
									{field.options.map((opt) => (
										<option key={opt} value={opt}>
											{opt}
										</option>
									))}
								</select>
							) : (
								<input
									id={field.key}
									type={field.type}
									value={formValues[field.key] ?? ''}
									onChange={(e) =>
										onFieldChange(field.key, e.target.value)
									}
									className='border border-brand-orange rounded-sm px-3 py-2 text-sm'
								/>
							)}
						</div>
					))}
				</div>
			</div>
		);
	}

	const details = [
		{
			label: 'full name',
			value: `${user.prefix ? user.prefix + ' ' : ''}${user.name}`,
		},
		{
			label: 'school email',
			value: user.email,
		},
		{
			label: 'phone number',
			value: user.phone || '—',
		},
		{
			label: 'date of birth',
			value: user.dob || '—',
		},
		{
			label: 'emergency contact',
			value:
				user.emergencyContactName || user.emergencyContactNumber
					? `${user.emergencyContactName ?? ''} (${user.emergencyContactNumber ?? ''})`
					: '—',
		},
		{
			label: 'address',
			value: user.address || '—',
		},
		...(isLecturer
			? [
					{
						label: 'highest qualification',
						value: user.highestQualification || '—',
					},
					{
						label: 'specialization',
						value: user.specialization || '—',
					},
				]
			: []),
	];

	return (
		<div className='flex flex-col gap-2 lg:gap-3 w-full'>
			<span className='flex items-center gap-2.5'>
				<Person className='size-5 lg:size-6' />
				<h3 className='font-semibold text-sm lg:text-xl text-black'>
					Personal Information
				</h3>
			</span>

			<div className='bg-white w-full p-5 lg:px-8 grid grid-cols-2 gap-7 lg:gap-8'>
				{details.map((detail) => (
					<div
						key={detail.label}
						className='flex flex-col gap-2 text-xs lg:text-sm'
					>
						<p className='uppercase text-label font-medium'>
							{detail.label}
						</p>
						<p className='text-black font-semibold'>
							{detail.value}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
