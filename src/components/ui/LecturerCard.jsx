export default function LecturerCard({ label, icon, bgColor, color, value }) {
	return (
		<div className='w-full flex flex-col justify-between gap-5 border border-brand-orange rounded-[10px] bg-white pt-4 pb-7 px-4'>
			<div className='flex justify-between items-center gap-2'>
				<p className='text-xs lg:text-sm text-black'>{label}</p>
				<span
					style={{ backgroundColor: bgColor }}
					className='p-1 rounded-[5px]'
				>
					<style>{`
            .icon-${color.replace('#', '')} path { stroke: ${color} !important; }
          `}</style>
					<span
						className={`flex justify-center items-center size-12 icon-${color.replace('#', '')} [&>svg]:w-4 [&>svg]:h-4 lg:[&>svg]:w-5 lg:[&>svg]:h-5`}
					>
						{icon}
					</span>
				</span>
			</div>
			<span className='text-[30px] lg:text-[40px] leading-6 text-brand-red font-medium'>
				{value}
			</span>
		</div>
	);
}
