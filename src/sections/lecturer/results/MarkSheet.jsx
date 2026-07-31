import { useMemo, useState } from 'react';
import ResultInfo from './ResultInfo';
import ResultTable from './ResultTable';
import StudentSearch from './StudentSearch';

const STATUS_LABELS = {
	draft: 'Draft',
	pending: 'Submitted',
	approved: 'Approved',
	rejected: 'Rejected',
};

/** Server rows -> the editable shape the mark sheet table renders. */
function toRows(students = []) {
	return students.map((entry) => {
		const grade = entry.grade;

		return {
			enrollmentId: entry.id,
			matric: entry.student.student_id,
			name: entry.student.name,
			dept: entry.student.department?.name ?? '',
			caScore: grade?.ca_score ?? '',
			projectScore: grade?.project_score ?? '',
			examScore: grade?.exam_score ?? '',
			letterGrade: grade?.letter_grade ?? '',
			status: STATUS_LABELS[grade?.status] ?? 'Draft',
			// An approved grade is final; a pending one is awaiting review and
			// must not be edited underneath the admin looking at it.
			locked: grade?.status === 'approved' || grade?.status === 'pending',
		};
	});
}

/**
 * The editable mark sheet for one course offering.
 *
 * Rendered with `key={offeringId}` by the parent, so switching course remounts
 * this component and the draft edits reset naturally. The previous version kept
 * the rows in the page component and re-seeded them from an effect whenever the
 * server data changed — which silently discarded in-progress edits on any
 * background refetch, and triggered a cascading re-render each time.
 */
export default function MarkSheet({ course, students, isLoading }) {
	const [rows, setRows] = useState(() => toRows(students));
	const [searchTerm, setSearchTerm] = useState('');

	const filtered = useMemo(() => {
		const term = searchTerm.trim().toLowerCase();

		if (!term) return rows;

		return rows.filter(
			(student) =>
				student.name.toLowerCase().includes(term) ||
				student.matric.toLowerCase().includes(term),
		);
	}, [rows, searchTerm]);

	const submittedCount = rows.filter(
		(row) => row.status === 'Submitted' || row.status === 'Approved',
	).length;

	const approvedCount = rows.filter(
		(row) => row.status === 'Approved',
	).length;

	return (
		<>
			{course && (
				<ResultInfo
					{...course}
					submittedCount={submittedCount}
					approvedCount={approvedCount}
				/>
			)}

			<StudentSearch onSearch={setSearchTerm} />

			{isLoading ? (
				<p
					className='py-10 text-center text-sm text-label'
					role='status'
				>
					Loading students…
				</p>
			) : (
				<ResultTable data={filtered} setData={setRows} />
			)}
		</>
	);
}
