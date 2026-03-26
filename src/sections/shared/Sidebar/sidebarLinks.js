import DashboardIcon from '../../../assets/svg/dashboard.svg?react'
import CourseIcon from '../../../assets/svg/course.svg?react'
import ResultsIcon from '../../../assets/svg/results.svg?react'
import ProfileIcon from '../../../assets/svg/profile.svg?react'

export const studentLinks = [
  { path: '/student/dashboard',            text: 'Dashboard' },
  { path: '/student/results',     text: 'Results' },
  { path: '/student/timetable',   text: 'Timetable' },
  { path: '/student/profile',     text: 'Profile' },
]

export const lecturerLinks = [
  { path: '/lecturer/dashboard',                   text: 'Dashboard',          Icon: DashboardIcon },
  { path: '/lecturer/course-details',     text: 'Course Details',     Icon: CourseIcon },
  { path: '/lecturer/results-management', text: 'Results Management', Icon: ResultsIcon },
  { path: '/lecturer/profile',            text: 'Profile',            Icon: ProfileIcon },
]