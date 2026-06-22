export default function AcademicSession({ value, onChange }) {

    const semesters = [
        { text: "2025/2026 1st Semester" },
        { text: "2024/2025 2nd Semester" },
        { text: "2024/2025 1st Semester" },
        { text: "2023/2024 2nd Semester" },
        { text: "2023/2024 1st Semester" },
    ]

    return (
        <form className="flex flex-col gap-2 lg:max-w-67.5 w-full">
            <label htmlFor="session-select" className="text-xs font-medium text-dark">Academic Session</label>
            <select
                id="session-select"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className="bg-white border border-brand-orange rounded-[10px] p-2.5 text-xs text-black"
            >
                {semesters.map((semester) => (
                    <option key={semester.text} value={semester.text}>{semester.text}</option>
                ))}
            </select>
        </form>
    )
}