import AcademicSession from '../../../student/results/AcademicSession';
import { useSelectedSession } from '../../../../hooks/useSelectedSession';
import { useAdminStudentGrades } from '../../../../hooks/admin/useAdminStudentGrades';
import { gradeColor } from '../../../../constants/grading';

export default function ProfileResults({ user }) {
	// Opening a student's profile mid-second-semester used to show an empty
	// first-semester table, which reads as "this student has no results".
	const { sessionId, setSessionId, semester, setSemester } =
		useSelectedSession();

	const { data, isLoading } = useAdminStudentGrades(user?.rawId, {
		sessionId,
		semester,
	});

	return (
		<div className='flex flex-col gap-6 px-4'>
			<AcademicSession
				sessionId={sessionId}
				onSessionChange={setSessionId}
				semester={semester}
				onSemesterChange={setSemester}
			/>

			{isLoading ? (
				<p className='text-sm text-label py-6 text-center'>
					Loading results...
				</p>
			) : !data?.grades?.length ? (
				<p className='text-sm text-label py-6 text-center'>
					No results for this session/semester.
				</p>
			) : (
				<div className='flex flex-col border border-brand-red rounded-[10px] overflow-hidden'>
					<table className='w-full text-xs'>
						<thead>
							<tr className='text-left text-xs text-black font-semibold bg-[#F9FAFB]'>
								<th className='py-2 px-4'>Code</th>
								<th className='py-2 px-4'>Title</th>
								<th className='py-2 px-4'>Units</th>
								<th className='py-2 px-4'>Grade</th>
							</tr>
						</thead>
						<tbody className='bg-white'>
							{data.grades.map((entry) => (
								<tr
									key={entry.course.code}
									className='border-t border-[#D0D0D0]'
								>
									<td className='py-2 px-4 font-semibold text-brand-red'>
										{entry.course.code}
									</td>
									<td className='py-2 px-4'>
										{entry.course.title}
									</td>
									<td className='py-2 px-4'>
										{entry.course.credit_units}
									</td>
									<td className='py-2 px-4'>
										{entry.grade ? (
											<span
												className={`text-xs font-semibold px-2.5 py-px rounded-[5px] ${gradeColor(entry.grade.letter_grade)}`}
											>
												{entry.grade.letter_grade}
											</span>
										) : (
											<span className='text-xs text-label'>
												Pending
											</span>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
