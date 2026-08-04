import Modal from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { useTranscript } from '../../../hooks/student/useTranscript';
import { downloadBlob, toCsv } from '../../../utils/downloadFile';

const SEMESTER_LABELS = { first: '1st Semester', second: '2nd Semester' };

/**
 * The student's academic record, laid out as a document.
 *
 * Printing is the browser's job. Marking the record with `data-print-region`
 * and the controls with `data-print-hide` lets the print stylesheet reduce the
 * page to just this, which the browser will save as a PDF — no PDF library, no
 * second template to keep in step with what is on screen.
 *
 * It is labelled unofficial throughout, because it is: nothing here is signed
 * or sealed by the school, and a document that looks official when it is not is
 * worse than one that is honest about it.
 */
export default function TranscriptModal({ onClose }) {
	const { data, isPending, isError } = useTranscript({ enabled: true });

	const handleDownloadCsv = () => {
		const rows = [
			['Unofficial transcript'],
			['Name', data.student.name],
			['Student ID', data.student.student_id],
			['Department', data.student.department ?? ''],
			['Generated', data.generated_at],
			[],
			[
				'Session',
				'Semester',
				'Code',
				'Title',
				'Units',
				'Grade',
				'Grade point',
			],
			...data.periods.flatMap((period) =>
				period.courses.map((course) => [
					period.session,
					SEMESTER_LABELS[period.semester] ?? period.semester,
					course.code,
					course.title,
					course.credit_units,
					course.letter_grade,
					course.grade_point,
				]),
			),
			[],
			['Cumulative credit units', data.total_credit_units],
			['CGPA', data.cgpa],
		];

		downloadBlob(
			new Blob([toCsv(rows)], { type: 'text/csv;charset=utf-8;' }),
			`transcript-${data.student.student_id?.replace(/\W+/g, '-') ?? 'record'}.csv`,
		);
	};

	return (
		<Modal heading='Unofficial Transcript' onClose={onClose}>
			{isPending ? (
				<p
					role='status'
					className='px-4 py-10 text-center text-sm text-label'
				>
					Building your transcript…
				</p>
			) : isError || !data ? (
				<p
					role='alert'
					className='px-4 py-10 text-center text-sm text-red-500'
				>
					Couldn't load your transcript. Please try again.
				</p>
			) : data.periods.length === 0 ? (
				<p className='px-4 py-10 text-center text-sm text-label'>
					You have no released results yet. Grades appear here once
					your department has approved them.
				</p>
			) : (
				<>
					<div
						data-print-region
						className='flex flex-col gap-5 px-4 pb-4 text-black'
					>
						<header className='flex flex-col gap-1 border-b border-border pb-3'>
							<h3 className='text-lg font-semibold'>
								Unofficial Academic Transcript
							</h3>
							<p className='text-xs text-label'>
								Not an official record. Issued for personal
								reference only — generated {data.generated_at}.
							</p>
						</header>

						<dl className='grid grid-cols-2 gap-2 text-sm lg:grid-cols-4'>
							<Detail label='Name' value={data.student.name} />
							<Detail
								label='Student ID'
								value={data.student.student_id}
							/>
							<Detail
								label='Department'
								value={data.student.department}
							/>
							<Detail label='Level' value={data.student.level} />
						</dl>

						{data.periods.map((period) => (
							<section
								key={`${period.session}-${period.semester}`}
								data-print-group
								className='flex flex-col gap-2'
							>
								<h4 className='text-sm font-semibold'>
									{period.session} ·{' '}
									{SEMESTER_LABELS[period.semester] ??
										period.semester}
								</h4>

								<table className='w-full text-xs'>
									<thead className='bg-[#F9F9FF] text-left text-label'>
										<tr>
											<th className='px-2 py-1.5 font-medium'>
												Code
											</th>
											<th className='px-2 py-1.5 font-medium'>
												Title
											</th>
											<th className='px-2 py-1.5 font-medium'>
												Units
											</th>
											<th className='px-2 py-1.5 font-medium'>
												Grade
											</th>
											<th className='px-2 py-1.5 font-medium'>
												Points
											</th>
										</tr>
									</thead>
									<tbody>
										{period.courses.map((course) => (
											<tr
												key={course.code}
												className='border-b border-border last:border-0'
											>
												<td className='px-2 py-1.5 font-semibold'>
													{course.code}
												</td>
												<td className='px-2 py-1.5'>
													{course.title}
												</td>
												<td className='px-2 py-1.5'>
													{course.credit_units}
												</td>
												<td className='px-2 py-1.5'>
													{course.letter_grade}
												</td>
												<td className='px-2 py-1.5'>
													{course.grade_point}
												</td>
											</tr>
										))}
									</tbody>
								</table>

								<p className='text-xs text-label'>
									Credit units: {period.total_credit_units} ·
									GPA: {period.gpa ?? '—'} · CGPA:{' '}
									{period.cgpa ?? '—'}
								</p>
							</section>
						))}

						<footer className='flex flex-col gap-1 border-t border-border pt-3 text-sm'>
							<p>
								<span className='text-label'>
									Total credit units:
								</span>{' '}
								<span className='font-semibold'>
									{data.total_credit_units}
								</span>
							</p>
							<p>
								<span className='text-label'>
									Cumulative GPA:
								</span>{' '}
								<span className='font-semibold'>
									{data.cgpa}
								</span>
							</p>
						</footer>
					</div>

					<div
						data-print-hide
						className='flex justify-end gap-3 px-4 pb-4'
					>
						<Button variant='secondary' onClick={handleDownloadCsv}>
							Download CSV
						</Button>
						<Button onClick={() => window.print()}>
							Print / Save as PDF
						</Button>
					</div>
				</>
			)}
		</Modal>
	);
}

function Detail({ label, value }) {
	return (
		<div>
			<dt className='text-xs text-label'>{label}</dt>
			<dd className='font-medium'>{value || '—'}</dd>
		</div>
	);
}
