import { gradeColor } from '../../../constants/grading';

export default function ResultsTable({
	sessionLabel,
	semesterLabel,
	grades,
	isLoading,
	isError,
}) {
	if (isLoading) {
		return (
			<p className='text-sm text-label py-10 text-center'>
				Loading results...
			</p>
		);
	}

	if (isError) {
		return (
			<p className='text-sm text-red-500 py-10 text-center'>
				Couldn't load results.
			</p>
		);
	}

	if (!grades || grades.length === 0) {
		return (
			<p className='text-sm text-label py-10 text-center'>
				No results for this session/semester.
			</p>
		);
	}

	const totalCredits = grades.reduce(
		(sum, g) => sum + (g.course.credit_units ?? 0),
		0,
	);

	const gradedEntries = grades.filter((g) => g.grade);
	const totalGradePoints = gradedEntries.reduce(
		(sum, g) => sum + Number(g.grade.grade_point) * g.course.credit_units,
		0,
	);
	const gradedCredits = gradedEntries.reduce(
		(sum, g) => sum + (g.course.credit_units ?? 0),
		0,
	);
	const semesterGpa =
		gradedCredits > 0 ? (totalGradePoints / gradedCredits).toFixed(2) : '—';

	return (
		<div className='flex flex-col gap-4'>
			<h3 className='hidden lg:block text-xl font-semibold text-dark'>
				Course Results - {sessionLabel} - {semesterLabel}
			</h3>
			<div className='flex flex-col border border-brand-red rounded-[10px]'>
				<table className='w-full text-xs'>
					<thead>
						<tr className='text-left text-xs text-black font-semibold'>
							<th className='py-2 px-2 lg:px-5'>Course Code</th>
							<th className='py-2 px-px lg:px-5'>Course Title</th>
							<th className='py-2 px-0.5 lg:px-5'>
								Credit Units
							</th>
							<th className='py-2 px-0.5 lg:px-5'>Final Grade</th>
							<th className='py-2 px-0.5 lg:px-5'>Grade Point</th>
						</tr>
					</thead>
					<tbody className='bg-white'>
						{grades.map((entry) => (
							<tr
								key={entry.course.code}
								className='min-h-15 border-b border-[#D0D0D0]'
							>
								<td className='py-2 px-0.75 lg:px-5 font-semibold text-brand-red'>
									{entry.course.code}
								</td>
								<td className='py-2 px-0.5 lg:px-5'>
									{entry.course.title}
								</td>
								<td className='py-2 px-0.5 lg:px-5'>
									{entry.course.credit_units}
								</td>
								<td className='py-2 px-0.5 lg:px-5'>
									{entry.grade ? (
										<span
											className={`text-xs font-semibold px-2.5 py-px rounded-[5px] ${gradeColor(entry.grade.letter_grade)}`}
										>
											{entry.grade.letter_grade}
										</span>
									) : (
										<span className='text-xs font-medium text-label'>
											Pending
										</span>
									)}
								</td>
								<td className='py-2 px-1 lg:px-5 font-medium text-center'>
									{entry.grade
										? Number(
												entry.grade.grade_point,
											).toFixed(2)
										: '—'}
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className='flex flex-col sm:flex-row justify-between items-center px-2.5 lg:px-8 py-3 lg:py-4 border-t border-gray-100'>
					<span className='text-xs font-medium text-[#4D4D4D]'>
						Total Credit Units:{' '}
						<span className='text-xl text-brand-red'>
							{totalCredits}
						</span>
					</span>
					<span className='text-xs font-medium text-[#4D4D4D]'>
						Semester GPA:{' '}
						<span className='text-xl text-brand-red'>
							{semesterGpa}
						</span>
					</span>
				</div>
			</div>
		</div>
	);
}
