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
 *
 * Seeding must wait for the query to succeed. `useState(() => toRows(students))`
 * ran on the first render, when the students query was still in flight and
 * `students` was the empty fallback — and since nothing re-seeded afterwards,
 * the sheet stayed permanently empty on every cold load. Re-seeding on each
 * prop change is not the fix either: saving a draft invalidates this query, so
 * that would throw away whatever the lecturer had typed since.
 *
 * The gate is `isSuccess` specifically, not `!isLoading`. A remounted query is
 * `pending` for a render or two before it starts fetching, and react-query
 * reports `isLoading` as false in that window — so keying off it seeded from
 * the empty fallback again, just with tighter timing.
 */
export default function MarkSheet({ course, students, isSuccess, isError }) {
	const [rows, setRows] = useState([]);
	const [isSeeded, setIsSeeded] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	// Adjusting state during render is React's documented alternative to an
	// effect for "derive once, when the data is finally there": it re-renders
	// before anything reaches the DOM, so there is no empty-table flash.
	if (!isSeeded && isSuccess) {
		setIsSeeded(true);
		setRows(toRows(students));
	}

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

			{isError ? (
				// Without this the failed request fell through to the table,
				// which renders "No results found" — telling the lecturer the
				// class is empty when in fact nothing was ever loaded.
				<p
					className='py-10 text-center text-sm text-red-500'
					role='alert'
				>
					Couldn't load the students for this course.
				</p>
			) : !isSeeded ? (
				// Driven by the seed flag rather than the query's own loading
				// flag, so the table is never shown before it holds real rows.
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
