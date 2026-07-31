export default function EntityPageShell({ title, children }) {
	return (
		<div className='flex flex-col gap-5 lg:py-6 py-8 lg:px-8 px-5'>
			<h2 className='text-xl lg:text-[30px] font-semibold'>{title}</h2>
			<div className='flex flex-col gap-4 lg:gap-3 w-full border border-border bg-white rounded-[10px]'>
				{children}
			</div>
		</div>
	);
}
