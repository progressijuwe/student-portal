import { useId, useMemo } from 'react';
import SearchInput from '../../../components/ui/SearchInput';
import { useDepartments } from '../../../hooks/useDepartments';

const LEVEL_OPTIONS = [
	{ value: '', label: 'All levels' },
	{ value: '100', label: '100' },
	{ value: '200', label: '200' },
	{ value: '300', label: '300' },
	{ value: '400', label: '400' },
	{ value: '500', label: '500' },
];

/**
 * Exported so a page with filters of its own — the offerings toolbar adds
 * session, semester, lecturer and status — can render them identically to the
 * shared ones instead of hand-rolling a second select style.
 */
export function FilterSelect({ label, value, onChange, options, disabled }) {
	const id = useId();

	return (
		<div className='flex w-full flex-col gap-1 lg:max-w-2xs'>
			{/* Visually hidden rather than absent: an unlabelled select is
			    announced only as "combo box" by a screen reader. */}
			<label htmlFor={id} className='sr-only'>
				{label}
			</label>
			<select
				id={id}
				value={value}
				disabled={disabled}
				onChange={(event) => onChange(event.target.value)}
				className='w-full rounded-lg border border-border px-3 py-2 text-sm focus-visible:border-brand-orange focus-visible:outline-2 focus-visible:outline-brand-border disabled:opacity-50'
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}

/**
 * Shared search + filter bar for the admin review tables.
 *
 * Faculties and departments come from /options/departments. Both toolbars
 * previously hardcoded a handful of names, which meant the filters silently
 * stopped matching as soon as a real department was added — and they filtered
 * on display names rather than ids, so any rename broke them too.
 */
export default function AdminFilterBar({
	search,
	onSearch,
	filters,
	onFilterChange,
	searchPlaceholder = 'Search…',
	showLevel = true,
	children,
}) {
	const { data: faculties = [], isPending } = useDepartments();

	const facultyOptions = useMemo(
		() => [
			{ value: '', label: 'All faculties' },
			...faculties.map((faculty) => ({
				value: String(faculty.id),
				label: faculty.name,
			})),
		],
		[faculties],
	);

	// Narrow the department list to the selected faculty, so the two filters
	// cannot be set to a contradictory combination.
	const departmentOptions = useMemo(() => {
		const scoped = filters.faculty_id
			? faculties.filter(
					(faculty) =>
						String(faculty.id) === String(filters.faculty_id),
				)
			: faculties;

		return [
			{ value: '', label: 'All departments' },
			...scoped.flatMap((faculty) =>
				(faculty.departments ?? []).map((department) => ({
					value: String(department.id),
					label: department.name,
				})),
			),
		];
	}, [faculties, filters.faculty_id]);

	return (
		<div className='flex flex-col gap-3 p-4'>
			<SearchInput
				value={search}
				onChange={onSearch}
				placeholder={searchPlaceholder}
				className='w-full'
			/>

			<div className='flex flex-wrap items-center gap-2'>
				{showLevel && (
					<FilterSelect
						label='Filter by level'
						value={filters.level}
						onChange={(value) =>
							onFilterChange({ ...filters, level: value })
						}
						options={LEVEL_OPTIONS}
					/>
				)}

				<FilterSelect
					label='Filter by faculty'
					value={filters.faculty_id}
					disabled={isPending}
					onChange={(value) =>
						// Clearing the faculty must clear the department too, or a
						// stale department id keeps filtering invisibly.
						onFilterChange({
							...filters,
							faculty_id: value,
							department_id: '',
						})
					}
					options={facultyOptions}
				/>

				<FilterSelect
					label='Filter by department'
					value={filters.department_id}
					disabled={isPending}
					onChange={(value) =>
						onFilterChange({ ...filters, department_id: value })
					}
					options={departmentOptions}
				/>

				{children}
			</div>
		</div>
	);
}
