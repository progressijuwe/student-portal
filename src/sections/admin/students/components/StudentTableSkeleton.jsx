export default function StudentTableSkeleton() {
	return (
		<section className='w-full animate-pulse'>
			<div className='hidden lg:block'>
				<div className='border border-border rounded-[10px] overflow-hidden'>
					<div className='bg-[#F9F9FF] grid grid-cols-7 gap-2 p-3'>
						{Array.from({ length: 7 }).map((_, i) => (
							<div
								key={i}
								className='h-3 bg-gray-200 rounded w-3/4'
							/>
						))}
					</div>
					{Array.from({ length: 6 }).map((_, i) => (
						<div
							key={i}
							className='grid grid-cols-7 gap-2 p-3 border-t'
						>
							{Array.from({ length: 7 }).map((_, j) => (
								<div
									key={j}
									className='h-3 bg-gray-200 rounded w-full'
								/>
							))}
						</div>
					))}
				</div>
			</div>

			<div className='flex flex-col gap-4 px-4 lg:hidden'>
				{Array.from({ length: 4 }).map((_, i) => (
					<div
						key={i}
						className='border border-border rounded-[10px] p-4 flex flex-col gap-3'
					>
						<div className='h-4 bg-gray-200 rounded w-1/2' />
						<div className='h-3 bg-gray-200 rounded w-1/3' />

						<div className='flex flex-col gap-2'>
							<div className='h-3 bg-gray-200 rounded w-full' />
							<div className='h-3 bg-gray-200 rounded w-5/6' />
							<div className='h-3 bg-gray-200 rounded w-4/6' />
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
