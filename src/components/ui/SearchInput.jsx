import Search from "../../assets/svg/search.svg?react";

export default function SearchInput({
	value = "",
	onChange,
	placeholder = "Search",
	id = "search-input",
	className = "",
}) {
	return (
		<span
			className={`relative flex items-center gap-2 py-2.5 px-4 rounded-[10px] border border-[#D1D5DC] w-full ${className}`}
		>
			<Search className='size-3.75 lg:size-5' />
			<label htmlFor={id} className='sr-only'>
				{placeholder}
			</label>
			<input
				id={id}
				type='search'
				value={value}
				placeholder={placeholder}
				className='w-full bg-transparent outline-none text-xs lg:text-sm placeholder:text-xs lg:placeholder:text-sm placeholder:text-[#0A0A0A80]'
				onChange={(e) => onChange?.(e.target.value)}
			/>
		</span>
	);
}
