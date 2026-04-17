const STATS_CONFIG = {
    credits: { bg: "bg-brand-blue", textColor: "text-brand-blue-border", borderColor: "border-brand-blue-border" },
    passed: { bg: "bg-[#D2FFE2]", textColor: "text-[#016630]", borderColor: "border-[#016630]" },
    failed: { bg: "bg-[#FFE4E4]", textColor: "text-brand-red", borderColor: "border-brand-red" },
    cgpa: { bg: "bg-[#F3E8FF]", textColor: "text-[#9810FA]", borderColor: "border-[#9810FA]" },
}

export default function ProfileStats() {
    const stats = [
        { key: "credits", label: "Total Credits", value: 17 },
        { key: "passed", label: "Passed Courses", value: 7 },
        { key: "failed", label: "Failed Courses", value: 0 },
        { key: "cgpa", label: "CGPA", value: 3.89 },
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