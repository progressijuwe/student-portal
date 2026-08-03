import { useId } from 'react';

/**
 * A select whose option list is narrowed by a server-backed search box.
 *
 * The course catalogue and the lecturer roster are both unbounded — a plain
 * `<select>` over either silently truncates at whatever page size the API
 * happens to return, and the admin has no way to tell that the entry they want
 * is missing rather than absent. Pairing the two controls keeps this a native,
 * keyboard-accessible select while letting the search reach the database.
 *
 * `hasMore` is surfaced rather than hidden: telling the admin to narrow the
 * search is honest, silently showing the first fifty is not.
 */
export default function SearchSelect({
	label,
	search,
	onSearchChange,
	searchPlaceholder = 'Search…',
	options,
	value,
	onChange,
	placeholder = 'Select',
	isPending = false,
	hasMore = false,
	error,
	required = false,
	disabled = false,
	hint,
}) {
	const searchId = useId();
	const selectId = useId();
	const errorId = useId();
	const hintId = useId();

	const selected = options.find((option) => option.value === String(value));

	return (
		<div className='flex flex-col gap-1.5'>
			<label
				htmlFor={selectId}
				className='text-sm font-medium text-black'
			>
				{label}
				{required && (
					<span aria-hidden='true' className='text-brand-red'>
						{' '}
						*
					</span>
				)}
			</label>

			<label htmlFor={searchId} className='sr-only'>
				Search {label.toLowerCase()}
			</label>
			<input
				id={searchId}
				type='search'
				value={search}
				disabled={disabled}
				onChange={(event) => onSearchChange(event.target.value)}
				placeholder={searchPlaceholder}
				className='rounded-[5px] border border-border px-4 py-2 text-sm placeholder:text-sm focus:border-brand-orange focus:outline-none disabled:opacity-50'
			/>

			<select
				id={selectId}
				value={value ?? ''}
				disabled={disabled || isPending}
				aria-invalid={error ? 'true' : undefined}
				aria-describedby={
					[error ? errorId : null, hint ? hintId : null]
						.filter(Boolean)
						.join(' ') || undefined
				}
				onChange={(event) => onChange(event.target.value)}
				className={`rounded-[5px] border px-4 py-3 text-sm focus:border-brand-orange focus:outline-none disabled:opacity-50 ${
					error ? 'border-red-500' : 'border-border'
				}`}
			>
				<option value=''>{isPending ? 'Loading…' : placeholder}</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>

			{selected?.hint && (
				<p className='text-xs text-label'>{selected.hint}</p>
			)}

			{hint && !error && (
				<p id={hintId} className='text-xs text-label'>
					{hint}
				</p>
			)}

			{hasMore && !error && (
				<p className='text-xs text-label'>
					Showing the first {options.length} matches — refine the
					search if you don't see the one you want.
				</p>
			)}

			{error && (
				<p id={errorId} role='alert' className='text-xs text-red-500'>
					{error}
				</p>
			)}
		</div>
	);
}
