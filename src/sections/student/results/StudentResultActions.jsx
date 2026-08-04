import Download from '../../../assets/svg/download-icon.svg?react';
import Transcript from '../../../assets/svg/transcript-icon.svg?react';
import { Button } from '../../../components/ui/Button';
import ActionBar from '../../../components/ui/ActionBar';
import { downloadBlob, toCsv } from '../../../utils/downloadFile';

/**
 * Both buttons used to be decoration — neither had a handler.
 *
 * "Download Result" builds its file from the grades already on screen, so it
 * cannot disagree with the table the student is looking at and costs no extra
 * request. A transcript is a different thing entirely — every session, not the
 * selected one — so that opens the full record instead.
 */
export default function StudentResultsActions({
	className,
	grades,
	sessionLabel,
	semesterLabel,
	studentId,
	onViewTranscript,
}) {
	// Only released grades belong in a downloaded result. A pending row on
	// screen is a course awaiting approval, not a mark the student has.
	const released = (grades ?? []).filter((entry) => entry.grade);
	const canDownload = released.length > 0;

	const handleDownload = () => {
		const rows = [
			['Session', sessionLabel ?? ''],
			['Semester', semesterLabel ?? ''],
			[],
			['Code', 'Title', 'Credit units', 'Grade', 'Grade point', 'Score'],
			...released.map((entry) => [
				entry.course.code,
				entry.course.title,
				entry.course.credit_units,
				entry.grade.letter_grade,
				entry.grade.grade_point,
				entry.grade.score,
			]),
			[],
			[
				'Total credit units',
				released.reduce(
					(sum, entry) =>
						sum + Number(entry.course.credit_units ?? 0),
					0,
				),
			],
		];

		const slug = [sessionLabel, semesterLabel]
			.filter(Boolean)
			.join('-')
			.replace(/\W+/g, '-')
			.toLowerCase();

		downloadBlob(
			new Blob([toCsv(rows)], { type: 'text/csv;charset=utf-8;' }),
			`results-${slug || studentId || 'semester'}.csv`,
		);
	};

	return (
		<ActionBar className={className}>
			<Button variant='secondary' onClick={onViewTranscript}>
				<Transcript />
				View Transcript
			</Button>

			<Button
				onClick={handleDownload}
				disabled={!canDownload}
				title={
					canDownload
						? undefined
						: 'No released results for this session and semester yet'
				}
			>
				<Download />
				Download Result
			</Button>
		</ActionBar>
	);
}
