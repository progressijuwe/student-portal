import { color } from 'chart.js/helpers';
import Course from '../../../assets/svg/course.svg?react'
import Courses from '../../../assets/svg/courses.svg?react'
import LecturerCard from '../../../components/ui/LecturerCard';

export default function LecturerStatCards(){
    const totalCourses = 4;
    const totalStudents = 169;
    const avgClassSize = Math.round(totalStudents/totalCourses)

    const stats = [
        {
            label: "Total Courses",
            icon: <Courses />,
            bgColor: "#FFEDD4",
            color: "#F54900",
            value: totalCourses
        },
        {
            label: "Total Students",
            icon: <Course />,
            bgColor: "#DBEAFE",
            color: "#155DFC",
            value: totalStudents
        },
        {
            label: "Avg. Class Size",
            icon: <Course />,
            bgColor: "#DCFCE7",
            color: "#00A63E",
            value: avgClassSize
        },
        {
            label: "Department",
            icon: <Courses />,
            bgColor: "#F3E8FF",
            color: "#9810FA",
            value: "SEng"
        }
    ]
    return(
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-9">
            {stats.map((stat) => (
                <LecturerCard
                key={stat.label}
                {...stat} />
            ))}
        </div>
    )
}