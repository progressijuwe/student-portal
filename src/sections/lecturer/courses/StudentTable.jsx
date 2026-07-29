export default function StudentTable({ students = [] }) {
	return (
		<div className='w-full overflow-x-auto'>
			<table className='w-full text-sm px-4'>
				<thead>
					<tr className='bg-[#F9FAFB] text-[10px] lg:text-xs uppercase text-label'>
						<th className='py-3 px-6 font-normal'>S/N</th>
						<th className='py-3 px-6 text-nowrap  font-normal'>
							Matric Number
						</th>
						<th className='py-3 px-6 text-nowrap font-normal'>
							Full Name
						</th>
						<th className='py-3 px-6 text-nowrap font-normal'>
							Department
						</th>
					</tr>
				</thead>
				<tbody>
					{students.map((student) => (
						<tr
							key={student.matric}
							className='border-b border-gray-100'
						>
							<td className='py-4 px-6 text-xs lg:text-base text-center text-black'>
								{student.sn}
							</td>
							<td className='py-4 px-6 text-xs lg:text-base text-center font-bold text-black'>
								{student.matric}
							</td>
							<td className='py-4 px-6 text-xs lg:text-base text-center text-black'>
								{student.name}
							</td>
							<td className='py-4 px-6 text-xs lg:text-base text-center text-black'>
								{student.dept}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
