import { useState } from 'react';
import { gradeColor } from '../../../constants/grading';
import { Button } from '../../../components/ui/Button';
import Letter from '../../../assets/svg/letter.svg?react';
import { useSaveDraftGrades } from '../../../hooks/lecturer/useSaveDraftGrades';
import { useBatchSubmitGrades } from '../../../hooks/lecturer/useBatchSubmitGrades';
import { getErrorMessage } from '../../../utils/getErrorMessage';

export default function ResultTable({ data, setData }) {
	const { mutateAsync: saveDrafts, isPending: isSavingDraft } =
		useSaveDraftGrades();
	const { mutateAsync: batchSubmit, isPending: isSubmitting } =
		useBatchSubmitGrades();
	const [actionError, setActionError] = useState(null);

	const handleChange = (enrollmentId, field, value) => {
		let num = Number(value);
		if (num < 0) num = 0;
		if (field === 'caScore' && num > 20) num = 20;
		if (field === 'projectScore' && num > 20) num = 20;
		if (field === 'examScore' && num > 60) num = 60;

		setData((prev) =>
			prev.map((student) => {
				if (student.enrollmentId !== enrollmentId) return student;
				return { ...student, [field]: value === '' ? '' : num };
			}),
		);
	};

	const editableRows = () => data.filter((s) => !s.locked);

	const handleSaveDraft = async () => {
		setActionError(null);
		const rows = editableRows().filter(
			(s) =>
				s.caScore !== '' || s.projectScore !== '' || s.examScore !== '',
		);

		if (rows.length === 0) {
			setActionError('No scores entered to save as draft.');
			return;
		}

		try {
			await saveDrafts(
				rows.map((s) => ({
					enrollment_id: s.enrollmentId,
					ca_score: s.caScore === '' ? null : s.caScore,
					project_score:
						s.projectScore === '' ? null : s.projectScore,
					exam_score: s.examScore === '' ? null : s.examScore,
				})),
			);
		} catch (error) {
			setActionError(
				getErrorMessage(error, { 500: 'Failed to save draft.' }),
			);
		}
	};

	const handleBatchSubmit = async () => {
		setActionError(null);

		const rows = editableRows().filter(
			(s) =>
				s.caScore !== '' && s.projectScore !== '' && s.examScore !== '',
		);

		if (rows.length === 0) {
			setActionError(
				'Please fill CA, Project, and Exam scores completely before submitting.',
			);
			return;
		}

		try {
			const result = await batchSubmit(
				rows.map((s) => ({
					enrollment_id: s.enrollmentId,
					ca_score: s.caScore,
					project_score: s.projectScore,
					exam_score: s.examScore,
				})),
			);

			setData((prev) =>
				prev.map((student) => {
					const submittedGrade = result.find(
						(g) => g.enrollment?.id === student.enrollmentId,
					);
					if (!submittedGrade) return student;
					return {
						...student,
						letterGrade: submittedGrade.letter_grade,
						status: 'Submitted',
						locked: true,
					};
				}),
			);
		} catch (error) {
			setActionError(
				getErrorMessage(error, {
					500: 'Failed to submit results. Please try again.',
				}),
			);
		}
	};

	const hasEditableRows = editableRows().length > 0;

	return (
		<div>
			<div className='w-full overflow-x-auto'>
				<table className='relative w-full text-sm px-4'>
					<thead>
						<tr className='bg-[#F9FAFB] text-[10px] lg:text-xs uppercase text-label'>
							<th scope='col' className='py-3 px-4 font-normal'>
								S/N
							</th>
							<th
								scope='col'
								className='py-3 px-4 text-nowrap  font-normal'
							>
								Matric Number
							</th>
							<th
								scope='col'
								className='py-3 px-4 text-nowrap font-normal'
							>
								Full Name
							</th>
							<th
								scope='col'
								className='py-3 px-4 text-nowrap font-normal'
							>
								CA (20)
							</th>
							<th
								scope='col'
								className='py-3 px-4 text-nowrap font-normal'
							>
								Project (20)
							</th>
							<th
								scope='col'
								className='py-3 px-4 text-nowrap font-normal'
							>
								Exam (60)
							</th>
							<th
								scope='col'
								className='py-3 px-4 text-nowrap font-normal'
							>
								Grade
							</th>
							<th
								scope='col'
								className='py-3 px-4 text-nowrap font-normal'
							>
								Status
							</th>
						</tr>
					</thead>
					<tbody className='bg-[#F8FEFA]'>
						{data.length === 0 ? (
							<tr>
								<td colSpan='8' className='text-center py-12'>
									<div className='flex flex-col items-center gap-2 text-gray-500'>
										<p
											className='text-sm md:text-base font-medium'
											aria-live='polite'
										>
											No results found
										</p>
										<p
											className='text-xs'
											aria-live='polite'
										>
											Try searching with a different name
											or matric number
										</p>
									</div>
								</td>
							</tr>
						) : (
							data.map((student, index) => (
								<tr
									key={student.enrollmentId}
									className='border-b border-gray-100'
								>
									<td className='py-3 px-4 text-xs lg:text-base'>
										{index + 1}
									</td>
									<th
										scope='row'
										className='py-3 px-4 font-bold text-xs lg:text-base'
									>
										{student.matric}
									</th>
									<td className='py-3 px-4 text-xs lg:text-base text-nowrap'>
										{student.name}
									</td>
									{/* CA */}
									<td className='relative px-2.5 text-xs lg:text-base'>
										<label
											htmlFor={`ca-${student.enrollmentId}`}
											className='sr-only'
										>
											CA score for {student.name}
										</label>
										<input
											id={`ca-${student.enrollmentId}`}
											type='number'
											min={0}
											max={20}
											disabled={student.locked}
											aria-disabled={student.locked}
											title={
												student.locked
													? 'Cannot edit after submission'
													: ''
											}
											className='border rounded px-2 py-1 w-full max-w-16'
											value={student.caScore ?? ''}
											onChange={(e) =>
												handleChange(
													student.enrollmentId,
													'caScore',
													e.target.value,
												)
											}
										/>
									</td>
									{/* Project */}
									<td
										scope='row'
										className='relative py-3 px-4 text-xs lg:text-base'
									>
										<label
											htmlFor={`project-${student.enrollmentId}`}
											className='sr-only'
										>
											Project score for {student.name}
										</label>
										<input
											id={`project-${student.enrollmentId}`}
											type='number'
											min={0}
											max={20}
											disabled={student.locked}
											aria-disabled={student.locked}
											className='border rounded px-2 py-1 w-full max-w-16'
											value={student.projectScore ?? ''}
											onChange={(e) =>
												handleChange(
													student.enrollmentId,
													'projectScore',
													e.target.value,
												)
											}
										/>
									</td>
									{/* Exam */}
									<td
										scope='row'
										className=' relative py-3 px-4 text-xs lg:text-base'
									>
										<label
											htmlFor={`exam-${student.enrollmentId}`}
											className='sr-only'
										>
											Exam score for {student.name}
										</label>
										<input
											id={`exam-${student.enrollmentId}`}
											type='number'
											min={0}
											max={60}
											disabled={student.locked}
											aria-disabled={student.locked}
											className='border rounded px-2 py-1 w-full max-w-16'
											value={student.examScore ?? ''}
											onChange={(e) =>
												handleChange(
													student.enrollmentId,
													'examScore',
													e.target.value,
												)
											}
										/>
									</td>
									{/* Grade */}
									<td
										scope='row'
										className='py-3 px-4 text-xs lg:text-base'
									>
										{student.letterGrade && (
											<span
												className={`px-2 py-1 rounded text-xs ${gradeColor(student.letterGrade)}`}
											>
												{student.letterGrade}
											</span>
										)}
									</td>
									{/* Status */}
									<td
										scope='row'
										className='py-3 px-4 text-xs lg:text-base'
									>
										<span
											className={`px-2.5 py-0.5 rounded-[10px] text-xs ${
												student.status === 'Draft'
													? 'bg-[#C9C9C9] text-[#2C2C2C]'
													: student.status ===
														  'Approved'
														? 'bg-green-100 text-green-700'
														: student.status ===
															  'Rejected'
															? 'bg-red-100 text-red-700'
															: 'bg-blue-100 text-blue-700'
											}`}
										>
											{student.status}
										</span>
									</td>
								</tr>
							))
						)}
					</tbody>
					<caption className='sr-only'>
						Student results table showing scores, grades and status
					</caption>
				</table>
			</div>
			{actionError && (
				<p className='text-red-500 text-xs mt-3'>{actionError}</p>
			)}
			<div className='flex justify-end gap-3 mt-6'>
				<Button
					type='button'
					variant='secondary'
					disabled={!hasEditableRows || isSavingDraft}
					onClick={handleSaveDraft}
				>
					{isSavingDraft ? 'Saving...' : 'Save as Draft'}
				</Button>
				<Button
					type='button'
					disabled={!hasEditableRows || isSubmitting}
					onClick={handleBatchSubmit}
				>
					<Letter
						className='size-3 lg:size-4 [&_path]:stroke-white'
						aria-hidden='true'
					/>
					{isSubmitting ? 'Submitting...' : 'Submit Results'}
				</Button>
			</div>
		</div>
	);
}
