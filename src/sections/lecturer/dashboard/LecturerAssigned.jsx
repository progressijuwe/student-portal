import View from '../../../assets/svg/view.svg?react'
import Result from '../../../assets/svg/result.svg?react'

// ── replace with API data ──
const session = "2025/2026 Academic Session - First Semester"
const courses = [
  { code: "SEN 401", title: "Software Engineering Security",  level: "400", credits: 3, students: 14 },
  { code: "SEN 403", title: "Database Management Systems",    level: "400", credits: 3, students: 29 },
  { code: "SEN 301", title: "Data Structures and Algorithms", level: "300", credits: 2, students: 60 },
  { code: "SEN 205", title: "Computer Programming II",        level: "200", credits: 3, students: 48 },
]

export default function LecturerAssigned() {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-sm lg:text-xl font-semibold text-black">Assigned Courses</h2>
      <p className="text-xs lg:text-base text-label">{session}</p>

      {/* Desktop table */}
      <table className="w-full mt-4 hidden lg:table">
        <thead>
          <tr className="border-t border-[#E5E7EB] bg-[#F9FAFB]">
            <th className="text-xs font-semibold text-black py-3 text-center">Course Code</th>
            <th className="text-xs font-semibold text-black py-3 text-center">Course Title</th>
            <th className="text-xs font-semibold text-black py-3 text-center">Level</th>
            <th className="text-xs font-semibold text-black py-3 text-center">Credit Units</th>
            <th className="text-xs font-semibold text-black py-3 text-center">Students</th>
            <th className="text-xs font-semibold text-black py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {courses.map((course) => (
            <tr key={course.code} className="border-b border-gray-100">
              <td className="py-6 text-sm text-center font-semibold text-brand-red">{course.code}</td>
              <td className="py-6 text-sm text-left max-w-25 text-black">{course.title}</td>
              <td className="py-6 text-sm text-center text-label">{course.level} Level</td>
              <td className="py-6 text-sm text-center text-label">{course.credits}</td>
              <td className="py-6 text-center">
                <span className="text-xs font-medium text-[#193CB8] bg-[#DBEAFE] px-3 py-1.5 rounded-full">
                  {course.students} students
                </span>
              </td>
              <td className="py-6 text-center">
                <div className="flex items-center justify-center gap-4">
                  <button className="flex items-center gap-1 text-xs font-medium text-brand-orange">
                    <View className="w-4 h-4" /> View
                  </button>
                  <button className="flex items-center gap-1 text-xs font-medium text-[#155DFC]">
                    <Result className="w-4 h-4" /> Results
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile cards */}
      <div className="flex flex-col lg:hidden mt-4">
        {courses.map((course) => (
          <div key={course.code} className="flex flex-col gap-2 border-b border-gray-100 py-5">
            <div className="flex justify-between items-start">
              <span className="text-sm font-semibold text-brand-red">{course.code}</span>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-xs font-medium text-brand-orange">
                  <View className="w-4 h-4" /> View
                </button>
                <button className="flex items-center gap-1 text-xs font-medium text-[#155DFC]">
                  <Result className="w-4 h-4" /> Results
                </button>
              </div>
            </div>
            <p className="text-xs text-black">{course.title}</p>
            <p className="text-xs text-label">{course.level}lv | {course.credits} Units</p>
            <span className="text-xs font-medium text-[#193CB8] bg-[#DBEAFE] px-3 py-1.5 rounded-full w-fit">
              {course.students} Students
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}