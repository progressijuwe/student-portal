import { useState, useMemo } from 'react';
import EmptyState from '../../components/ui/EmptyState';
import CoursePane from '../../sections/lecturer/courses/CoursePane';
import CourseSelect from '../../sections/lecturer/courses/CourseSelect';
import CourseStudents from '../../sections/lecturer/courses/CourseStudents';
import { useLecturerCourses } from '../../hooks/lecturer/useLecturerCourses';

export default function LecturerCoursesPage() {
	const { data, isLoading, isError } = useLecturerCourses();

	const courses = useMemo(() => {
		return (data?.courses ?? []).map((entry) => ({
			offeringId: entry.offering.id,
			code: entry.offering.course.code,
			title: entry.offering.course.title,
			label: `${entry.offering.course.code} - ${entry.offering.course.title}`,
			level: entry.offering.course.level,
			credits: entry.offering.course.credit_units,
			semester: entry.offering.semester,
			enrolledCount: entry.enrolled_count,
		}));
	}, [data]);

	const [selectedOfferingId, setSelectedOfferingId] = useState(null);

	if (!selectedOfferingId && courses.length > 0) {
		setSelectedOfferingId(courses[0].offeringId);
	}

	const selectedCourse =
		courses.find((c) => c.offeringId === selectedOfferingId) ?? null;

	if (isLoading) {
		return (
			<p className='px-5 py-8 text-sm text-label'>Loading courses...</p>
		);
	}

	if (isError) {
		return (
			<p className='px-5 py-8 text-sm text-red-500'>
				Couldn't load courses.
			</p>
		);
	}

	if (!courses.length) {
		return (
			<EmptyState
				title='No courses found'
				description='Courses will appear here once assigned.'
			/>
		);
	}

	return (
		<div className='px-5 py-8 flex flex-col gap-6'>
			<CourseSelect
				options={courses}
				value={selectedCourse}
				onSelect={(course) => setSelectedOfferingId(course.offeringId)}
			/>
			<CoursePane course={selectedCourse} />
			<CourseStudents
				offeringId={selectedOfferingId}
				course={selectedCourse}
			/>
		</div>
	);
}
