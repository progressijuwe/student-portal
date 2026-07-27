    import { departmentCodes } from "../../../../constants/departments"

    const STATS_CONFIG = {
        primary: {
            bg: "bg-brand-blue",
            textColor: "text-brand-blue-border",
            borderColor: "border-brand-blue-border",
        },
        secondary: {
            bg: "bg-[#D2FFE2]",
            textColor: "text-[#016630]",
            borderColor: "border-[#016630]",
        },
        tertiary: {
            bg: "bg-[#FFE4E4]",
            textColor: "text-brand-red",
            borderColor: "border-brand-red",
        },
        quaternary: {
            bg: "bg-[#F3E8FF]",
            textColor: "text-[#9810FA]",
            borderColor: "border-[#9810FA]",
        },
    }

    export default function ProfileStats({ user }) {

        if (!user) return null
        
        const code = departmentCodes[user.department] || "N/A"

        const isStudent = "level" in user

        const stats = isStudent
            ? [
                {
                    key: "primary",
                    label: "Total Credits",
                    value: user.totalCredits,
                },
                {
                    key: "secondary",
                    label: "Passed Courses",
                    value: user.passedCourses,
                },
                {
                    key: "tertiary",
                    label: "Failed Courses",
                    value: user.failedCourses,
                },
                {
                    key: "quaternary",
                    label: "CGPA",
                    value: user.CGPA,
                },
            ]
        : [
            {
                key: "primary",
                label: "Department",
                value: code,
            },
            {
                key: "secondary",
                label: "Courses",
                value: user.totalCourses,
            },
            {
                key: "tertiary",
                label: "Students",
                value: user.totalStudents,
            },
            {
                key: "quaternary",
                label: "Avg. Students",
                value: user.averageStudents,
            },
        ]

        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 px-4">
                {stats.map((stat) => {
                    const config = STATS_CONFIG[stat.key]

                    return (
                        <div
                            key={stat.key}
                            className={`
                                flex flex-col gap-0.75 shrink border rounded-[5px] py-3 px-8 text-center
                                ${config.bg} ${config.borderColor}
                            `}
                        >
                            <p className={`text-[30px] font-semibold ${config.textColor}`}>
                                {stat.value}
                            </p>
                            <p className="text-xs">
                                {stat.label}
                            </p>
                        </div>
                    )
                })}
            </div>
        )
    }