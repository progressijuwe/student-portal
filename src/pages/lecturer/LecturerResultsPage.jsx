import { useMemo, useState } from 'react';
import CourseSelect from '../../sections/lecturer/courses/CourseSelect';
import MarkSheet from '../../sections/lecturer/results/MarkSheet';
import EmptyState from '../../components/ui/EmptyState';
import { useLecturerCourses } from '../../hooks/lecturer/useLecturerCourses';
import { useOfferingStudents } from '../../hooks/lecturer/useOfferingStudents';

export default function LecturerResultsPage() {
	const { data: coursesData, isLoading: coursesLoading } =
		useLecturerCourses();

	const courses = useMemo(
		() =>
			(coursesData?.courses ?? []).map((entry) => ({
				offeringId: entry.offering.id,
				code: entry.offering.course.code,
				title: entry.offering.course.title,
				label: `${entry.offering.course.code} - ${entry.offering.course.title}`,
			})),
		[coursesData],
	);

	// Derived rather than synced: the first course is the selection until the
	// lecturer picks another. Seeding this from an effect meant an extra render
	// pass on every load and a window where nothing was selected.
	const [chosenOfferingId, setChosenOfferingId] = useState(null);
	const selectedOfferingId =
		chosenOfferingId ?? courses[0]?.offeringId ?? null;

	const selectedCourse =
		courses.find((course) => course.offeringId === selectedOfferingId) ??
		null;

	const { data: studentsData, isLoading: studentsLoading } =
		useOfferingStudents(selectedOfferingId);

	if (coursesLoading) {
		return (
			<p className='px-4 py-8 text-sm text-label' role='status'>
				Loading courses…
			</p>
		);
	}

	if (!courses.length) {
		return (
			<EmptyState
				title='No results found'
				description='Results will appear here once you are assigned a course.'
			/>
		);
	}

	return (
		<div className='flex flex-col gap-8 px-4 py-8 lg:gap-6 lg:px-8 lg:py-7'>
			<CourseSelect
				options={courses}
				value={selectedCourse}
				onSelect={(course) => setChosenOfferingId(course.offeringId)}
			/>

			<MarkSheet
				// Remounting on course change resets the draft edits, which is
				// what should happen when the lecturer switches mark sheets.
				key={selectedOfferingId}
				course={selectedCourse}
				students={studentsData?.students ?? []}
				isLoading={studentsLoading}
			/>
		</div>
	);
}
