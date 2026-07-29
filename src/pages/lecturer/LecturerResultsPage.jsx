import { useState, useMemo, useEffect } from 'react';
import CourseSelect from '../../sections/lecturer/courses/CourseSelect';
import ResultInfo from '../../sections/lecturer/results/ResultInfo';
import ResultTable from '../../sections/lecturer/results/ResultTable';
import StudentSearch from '../../sections/lecturer/results/StudentSearch';
import EmptyState from '../../components/ui/EmptyState';
import { useLecturerCourses } from '../../hooks/lecturer/useLecturerCourses';
import { useOfferingStudents } from '../../hooks/lecturer/useOfferingStudents';

export default function LecturerResultsPage() {
	const { data: coursesData, isLoading: coursesLoading } =
		useLecturerCourses();

	const courses = useMemo(() => {
		return (coursesData?.courses ?? []).map((entry) => ({
			offeringId: entry.offering.id,
			code: entry.offering.course.code,
			title: entry.offering.course.title,
			label: `${entry.offering.course.code} - ${entry.offering.course.title}`,
		}));
	}, [coursesData]);

	const [selectedOfferingId, setSelectedOfferingId] = useState(null);

	useEffect(() => {
		if (!selectedOfferingId && courses.length > 0) {
			setSelectedOfferingId(courses[0].offeringId);
		}
	}, [courses, selectedOfferingId]);

	const selectedCourse =
		courses.find((c) => c.offeringId === selectedOfferingId) ?? null;

	const { data: studentsData, isLoading: studentsLoading } =
		useOfferingStudents(selectedOfferingId);

	// Build table rows straight from the server response — status/scores are always authoritative
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		if (!studentsData?.students) {
			setTableData([]);
			return;
		}

		const rows = studentsData.students.map((entry) => {
			const grade = entry.grade;
			const statusLabel = !grade
				? 'Draft'
				: grade.status === 'draft'
					? 'Draft'
					: grade.status === 'approved'
						? 'Approved'
						: grade.status === 'rejected'
							? 'Rejected'
							: 'Submitted';

			return {
				enrollmentId: entry.id,
				matric: entry.student.student_id,
				name: entry.student.name,
				dept: entry.student.department?.name ?? '',
				caScore: grade?.ca_score ?? '',
				projectScore: grade?.project_score ?? '',
				examScore: grade?.exam_score ?? '',
				letterGrade: grade?.letter_grade ?? '',
				status: statusLabel,
				locked:
					grade?.status === 'approved' || grade?.status === 'pending',
			};
		});

		setTableData(rows);
	}, [studentsData]);

	const [searchTerm, setSearchTerm] = useState('');

	const filteredStudents = useMemo(() => {
		const term = searchTerm.toLowerCase();
		return tableData.filter(
			(student) =>
				student.name.toLowerCase().includes(term) ||
				student.matric.toLowerCase().includes(term),
		);
	}, [tableData, searchTerm]);

	const submittedCount = tableData.filter(
		(s) => s.status === 'Submitted' || s.status === 'Approved',
	).length;
	const approvedCount = tableData.filter(
		(s) => s.status === 'Approved',
	).length;

	if (coursesLoading) {
		return (
			<p className='px-4 py-8 text-sm text-label'>Loading courses...</p>
		);
	}

	if (!courses.length) {
		return (
			<EmptyState
				title='No Results found'
				description='Results will appear here once courses are available.'
			/>
		);
	}

	return (
		<div className='flex flex-col gap-8 lg:gap-6 px-4 py-8 lg:py-7 lg:px-8'>
			<CourseSelect
				options={courses}
				value={selectedCourse}
				onSelect={(course) => setSelectedOfferingId(course.offeringId)}
			/>
			{selectedCourse && (
				<ResultInfo
					{...selectedCourse}
					submittedCount={submittedCount}
					approvedCount={approvedCount}
				/>
			)}
			<StudentSearch onSearch={setSearchTerm} />
			{studentsLoading ? (
				<p className='text-sm text-label py-10 text-center'>
					Loading students...
				</p>
			) : (
				<ResultTable data={filteredStudents} setData={setTableData} />
			)}
		</div>
	);
}
