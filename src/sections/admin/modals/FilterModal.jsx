import { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';

export default function FilterModal({
	onClose,
	onApply,
	initialFilters = {},
	fields = [],
	heading = 'Filter',
}) {
	const initialState = fields.reduce((acc, field) => {
		acc[field.name] = initialFilters[field.name] || '';
		return acc;
	}, {});

	const [filters, setFilters] = useState(initialState);

	const handleChange = (name, value) => {
		setFilters((prev) => ({ ...prev, [name]: value }));
	};

	const handleReset = () => {
		const empty = fields.reduce((acc, field) => {
			acc[field.name] = '';
			return acc;
		}, {});
		setFilters(empty);
		onApply(empty);
		onClose();
	};

	const handleApply = () => {
		onApply(filters);
		onClose();
	};

	return (
		<Modal heading={heading} onClose={onClose}>
			<div className='flex flex-col gap-6 px-4'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
					{fields.map((field) => (
						<Field
							key={field.name}
							label={field.label}
							id={`filter-${field.name}`}
							value={filters[field.name]}
							onChange={(val) => handleChange(field.name, val)}
							options={field.options}
						/>
					))}
				</div>
				<div className='flex flex-col lg:flex-row justify-between gap-4 pt-2'>
					<Button
						type='button'
						variant='tertiary'
						onClick={handleReset}
					>
						Reset Filters
					</Button>
					<div className='flex gap-3 justify-end'>
						<Button
							type='button'
							variant='tertiary'
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button
							type='button'
							variant='primary'
							onClick={handleApply}
						>
							Apply Filters
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
}

function Field({ label, id, value, onChange, options }) {
	return (
		<div className='flex flex-col gap-2'>
			<label htmlFor={id} className='text-sm font-medium text-black'>
				{label}
			</label>
			<select
				id={id}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className='border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-orange'
			>
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);
}
