import DashboardIcon from '../../../assets/svg/dashboard.svg?react';
import CourseIcon from '../../../assets/svg/course.svg?react';
import ResultsIcon from '../../../assets/svg/results.svg?react';
import ProfileIcon from '../../../assets/svg/profile.svg?react';
import StudentsIcon from '../../../assets/svg/students.svg?react';
import LecturersIcon from '../../../assets/svg/people.svg?react';
import CoursesIcon from '../../../assets/svg/courseIcon.svg?react';
import RegIcon from '../../../assets/svg/registration.svg?react';

export const studentLinks = [
	{ path: '/student/dashboard', text: 'Dashboard' },
	{ path: '/student/course-registration', text: 'Course Registration' },
	{ path: '/student/results', text: 'Results' },
	{ path: '/student/timetable', text: 'Timetable' },
	{ path: '/student/profile', text: 'Profile' },
];

export const lecturerLinks = [
	{ path: '/lecturer/dashboard', text: 'Dashboard', Icon: DashboardIcon },
	{
		path: '/lecturer/course-details',
		text: 'Course Details',
		Icon: CourseIcon,
	},
	{
		path: '/lecturer/results-management',
		text: 'Results Management',
		Icon: ResultsIcon,
	},
	{ path: '/lecturer/profile', text: 'Profile', Icon: ProfileIcon },
];

export const adminLinks = [
	{ path: '/admin/dashboard', text: 'Dashboard', Icon: DashboardIcon },
	{ path: '/admin/students', text: 'Students', Icon: StudentsIcon },
	{ path: '/admin/lecturers', text: 'Lecturers', Icon: LecturersIcon },
	{ path: '/admin/courses', text: 'Courses', Icon: CoursesIcon },
	// Sits between the catalogue and the registrations it makes possible,
	// because that is the order an admin has to do them in.
	{ path: '/admin/offerings', text: 'Course offerings', Icon: CourseIcon },
	{
		path: '/admin/courses-registrations',
		text: 'Course registrations',
		Icon: RegIcon,
	},
	{ path: '/admin/results', text: 'Results', Icon: ResultsIcon },
];
