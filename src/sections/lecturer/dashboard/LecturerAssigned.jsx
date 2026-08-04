import View from '../../../assets/svg/view.svg?react';
import Result from '../../../assets/svg/result.svg?react';
import { useLecturerCourses } from '../../../hooks/lecturer/useLecturerCourses';

export default function LecturerAssigned() {
	const { data, isLoading, isError } = useLecturerCourses();

	if (isLoading) {
		return (
			<p className='text-sm text-label py-10 text-center'>
				Loading assigned courses...
			</p>
		);
	}

	if (isError) {
		return (
			<p className='text-sm text-red-500 py-10 text-center'>
				Couldn't load assigned courses.
			</p>
		);
	}

	const courses = (data?.courses ?? []).map((entry) => ({
		code: entry.offering.course.code,
		title: entry.offering.course.title,
		level: entry.offering.course.level,
		credits: entry.offering.course.credit_units,
		students: entry.enrolled_count,
	}));

	return (
		<div className='flex flex-col gap-1'>
			<h2 className='text-sm lg:text-xl font-semibold text-black'>
				Assigned Courses
			</h2>
			<p className='text-xs lg:text-base text-label'>{data?.session}</p>

			{courses.length === 0 ? (
				<p className='text-sm text-label py-10 text-center'>
					No courses assigned for this session.
				</p>
			) : (
				<>
					{/* Desktop table */}
					<table className='w-full mt-4 hidden lg:table'>
						<thead>
							<tr className='border-t border-[#E5E7EB] bg-[#F9FAFB]'>
								<th className='text-xs font-semibold text-black py-3 text-center'>
									Course Code
								</th>
								<th className='text-xs font-semibold text-black py-3 text-center'>
									Course Title
								</th>
								<th className='text-xs font-semibold text-black py-3 text-center'>
									Level
								</th>
								<th className='text-xs font-semibold text-black py-3 text-center'>
									Credit Units
								</th>
								<th className='text-xs font-semibold text-black py-3 text-center'>
									Students
								</th>
								<th className='text-xs font-semibold text-black py-3 text-center'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className='bg-white'>
							{courses.map((course) => (
								<tr
									key={course.code}
									className='border-b border-gray-100'
								>
									<td className='py-6 text-sm text-center font-semibold text-brand-red'>
										{course.code}
									</td>
									<td className='py-6 text-sm text-center max-w-25 text-black'>
										{course.title}
									</td>
									<td className='py-6 text-sm text-center text-label'>
										{course.level} Level
									</td>
									<td className='py-6 text-sm text-center text-label'>
										{course.credits}
									</td>
									<td className='py-6 text-center'>
										<span className='text-xs font-medium text-[#193CB8] bg-[#DBEAFE] px-3 py-1.5 rounded-full'>
											{course.students}{' '}
											{course.students === 1
												? 'student'
												: 'students'}
										</span>
									</td>
									<td className='py-6 text-center'>
										<div className='flex items-center justify-center gap-4'>
											<button className='flex items-center gap-1 text-xs font-medium text-brand-orange'>
												<View className='w-4 h-4' />{' '}
												View
											</button>
											<button className='flex items-center gap-1 text-xs font-medium text-[#155DFC]'>
												<Result className='w-4 h-4' />{' '}
												Results
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					{/* Mobile cards */}
					<div className='flex flex-col lg:hidden mt-4'>
						{courses.map((course) => (
							<div
								key={course.code}
								className='flex flex-col gap-2 border-b border-gray-100 py-5'
							>
								<div className='flex justify-between items-start'>
									<span className='text-sm font-semibold text-brand-red'>
										{course.code}
									</span>
									<div className='flex items-center gap-4'>
										<button className='flex items-center gap-1 text-xs font-medium text-brand-orange'>
											<View className='w-4 h-4' /> View
										</button>
										<button className='flex items-center gap-1 text-xs font-medium text-[#155DFC]'>
											<Result className='w-4 h-4' />{' '}
											Results
										</button>
									</div>
								</div>
								<p className='text-xs text-black'>
									{course.title}
								</p>
								<p className='text-xs text-label'>
									{course.level}lv | {course.credits} Units
								</p>
								<span className='text-xs font-medium text-[#193CB8] bg-[#DBEAFE] px-3 py-1.5 rounded-full w-fit'>
									{course.students}{' '}
									{course.students === 1
										? 'Student'
										: 'Students'}
								</span>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}
