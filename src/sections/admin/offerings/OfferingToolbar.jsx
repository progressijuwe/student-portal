import { useMemo } from 'react';
import AdminFilterBar, { FilterSelect } from '../shared/AdminFilterBar';
import { useAcademicSessions } from '../../../hooks/useAcademicSessions';
import { useLecturerOptions } from '../../../hooks/admin/useLecturerOptions';

const SEMESTER_OPTIONS = [
	{ value: '', label: 'All semesters' },
	{ value: 'first', label: 'First Semester' },
	{ value: 'second', label: 'Second Semester' },
];

const STATUS_OPTIONS = [
	{ value: '', label: 'Any status' },
	{ value: 'true', label: 'Open for registration' },
	{ value: 'false', label: 'Closed' },
];

export default function OfferingToolbar({
	search,
	onSearch,
	filters,
	onFilterChange,
}) {
	const { data: sessions = [] } = useAcademicSessions();
	const { options: lecturerOptions } = useLecturerOptions();

	const sessionOptions = useMemo(
		() => [
			{ value: '', label: 'All sessions' },
			...sessions.map((session) => ({
				value: String(session.id),
				label: session.is_current
					? `${session.name} (current)`
					: session.name,
			})),
		],
		[sessions],
	);

	const lecturerFilterOptions = useMemo(
		() => [
			{ value: '', label: 'Any lecturer' },
			// The reason this filter exists: an offering nobody is assigned to
			// blocks grading, and there is otherwise no way to list them.
			{ value: 'unassigned', label: 'Unassigned only' },
			...lecturerOptions,
		],
		[lecturerOptions],
	);

	return (
		<AdminFilterBar
			search={search}
			onSearch={onSearch}
			filters={filters}
			onFilterChange={onFilterChange}
			searchPlaceholder='Search by course code or title…'
			// Offerings are filtered by session and semester rather than by
			// student level, so the shared level select would be dead weight.
			showLevel={false}
		>
			<FilterSelect
				label='Filter by session'
				value={filters.session_id}
				onChange={(value) =>
					onFilterChange({ ...filters, session_id: value })
				}
				options={sessionOptions}
			/>

			<FilterSelect
				label='Filter by semester'
				value={filters.semester}
				onChange={(value) =>
					onFilterChange({ ...filters, semester: value })
				}
				options={SEMESTER_OPTIONS}
			/>

			<FilterSelect
				label='Filter by lecturer'
				value={filters.lecturer_id}
				onChange={(value) =>
					onFilterChange({ ...filters, lecturer_id: value })
				}
				options={lecturerFilterOptions}
			/>

			<FilterSelect
				label='Filter by status'
				value={filters.is_active}
				onChange={(value) =>
					onFilterChange({ ...filters, is_active: value })
				}
				options={STATUS_OPTIONS}
			/>
		</AdminFilterBar>
	);
}
