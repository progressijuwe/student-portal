import { gradeColor } from "../../../constants/grading"
import { Button } from "../../../components/ui/Button"
import Letter from '../../../assets/svg/letter.svg?react'

export default function ResultTable({ data, setData }) {

    const handleChange = (matric, field, value) => {
        let num = Number(value)

        if (num < 0) num = 0
        if (field === "ca" && num > 20) num = 20
        if (field === "project" && num > 20) num = 20
        if (field === "exam" && num > 60) num = 60

        setData(prev =>
            prev.map(student => {
                if (student.matric !== matric) return student

                const updatedStudent = {
                    ...student,
                    [field]: value === "" ? "" : num
                }

                const total =
                    (Number(updatedStudent.ca) || 0) +
                    (Number(updatedStudent.project) || 0) +
                    (Number(updatedStudent.exam) || 0)

                return {
                    ...updatedStudent,
                    total,
                    grade: getGrade(total),
                }
            })
        )
    }

    const handleSubmit = () => {
        const hasEmpty = data.some(
            (s) => s.ca === "" || s.project === "" || s.exam === ""
        )

        if (hasEmpty) {
            alert("Please fill all scores before submitting.")
            return
        }

        const updated = allData.map((student) => ({
            ...student,
            status: "Submitted",
        }))

        setData(updated)
    }

    const getGrade = (total) => {
        if (total >= 95) return "A"
        if (total >= 85) return "A-"
        if (total >= 60) return "B"
        if (total >= 50) return "C"
        if (total >= 45) return "D"
        if (total >= 40) return "E"
        return "F"
    }
    return (
        <div>
            <div className="w-full overflow-x-auto">
                <table className="relative w-full text-sm px-4">
                    <thead>
                        <tr className="bg-[#F9FAFB] text-[10px] lg:text-xs uppercase text-label">
                            <th scope="col" className="py-3 px-4 font-normal">S/N</th>
                            <th scope="col" className="py-3 px-4 text-nowrap  font-normal">Matric Number</th>
                            <th scope="col" className="py-3 px-4 text-nowrap font-normal">Full Name</th>
                            <th scope="col" className="py-3 px-4 text-nowrap font-normal">CA (20)</th>
                            <th scope="col" className="py-3 px-4 text-nowrap font-normal">Project (20)</th>
                            <th scope="col" className="py-3 px-4 text-nowrap font-normal">Exam (60)</th>
                            <th scope="col" className="py-3 px-4 text-nowrap font-normal">Total</th>
                            <th scope="col" className="py-3 px-4 text-nowrap font-normal">Grade</th>
                            <th scope="col" className="py-3 px-4 text-nowrap font-normal">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#F8FEFA]">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="text-center py-12">
                                    <div className="flex flex-col items-center gap-2 text-gray-500" >
                                        <p className="text-sm md:text-base font-medium" aria-live="polite">No results found</p>
                                        <p className="text-xs" aria-live="polite">Try searching with a different name or matric number</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((student, index) => (
                                <tr key={student.matric} className="border-b border-gray-100">
                                    <td className="py-3 px-4 text-xs lg:text-base">{index + 1}</td>
                                    <th scope="row" className="py-3 px-4 font-bold text-xs lg:text-base">{student.matric}</th>
                                    <td className="py-3 px-4 text-xs lg:text-base text-nowrap">{student.name}</td>
                                    {/* CA */}
                                    <td className="relative px-2.5 text-xs lg:text-base">
                                        <label htmlFor={`ca-${student.matric}`} className="sr-only">
                                            CA score for {student.name}
                                        </label>
                                        <input
                                        id={`ca-${student.matric}`}
                                        type="number"
                                        min={0}
                                        max={20} 
                                        disabled={student.status !== "Draft"}
                                        aria-disabled={student.status !== "Draft"}
                                        title={student.status !== "Draft" ? "Cannot edit after submission" : ""}
                                        className="border rounded px-2 py-1 w-full max-w-16"
                                        value={student.ca ?? ""}
                                        onChange={(e) => handleChange(student.matric, "ca", e.target.value)}
                                        />
                                    </td>
                                    {/* Project */}
                                    <td scope="row" className="relative py-3 px-4 text-xs lg:text-base">
                                        <label htmlFor={`project-${student.matric}`} className="sr-only">
                                            Project score for {student.name}
                                        </label>
                                        <input
                                        id={`project-${student.matric}`}
                                        type="number"
                                        min={0}
                                        max={20}
                                        disabled={student.status !== "Draft"}
                                        aria-disabled={student.status !== "Draft"}
                                        className="border rounded px-2 py-1 w-full max-w-16"
                                        value={student.project ?? ""}
                                        onChange={(e) => handleChange(student.matric, "project", e.target.value)}
                                        />
                                    </td>
                                    {/* Exam */}
                                    <td scope="row" className=" relative py-3 px-4 text-xs lg:text-base">
                                        <label htmlFor={`exam-${student.matric}`} className="sr-only">
                                            Exam score for {student.name}
                                        </label>
                                        <input
                                        id={`exam-${student.matric}`}
                                        type="number"
                                        min={0}
                                        max={60}
                                        disabled={student.status !== "Draft"}
                                        aria-disabled={student.status !== "Draft"}
                                        className="border rounded px-2 py-1 w-full max-w-16"
                                        value={student.exam ?? ""}
                                        onChange={(e) => handleChange(student.matric, "exam", e.target.value)}
                                        />
                                    </td>
                                    {/* Total */}
                                    <td scope="row" className="py-3 px-4 text-xs lg:text-base font-semibold">
                                        {student.total}
                                    </td>
                                    {/* Grade */}
                                    <td scope="row" className="py-3 px-4 text-xs lg:text-base">
                                        {student.grade && (
                                        <span className={`px-2 py-1 rounded text-xs ${gradeColor(student.grade)}`}>
                                            {student.grade}
                                        </span>
                                        )}
                                    </td>
                                    {/* Status */}
                                    <td scope="row" className="py-3 px-4 text-xs lg:text-base">
                                        <span className={`px-2.5 py-0.5 rounded-[10px] text-xs ${
                                        student.status === "Draft"
                                            ? "bg-[#C9C9C9] text-[#2C2C2C]"
                                            : "bg-blue-100 text-blue-700"
                                        }`}>
                                        {student.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                    <caption className="sr-only">
                        Student results table showing scores, totals, grades and status
                    </caption>
                </table>
            </div>
            <div className="flex justify-end mt-6">
                <Button 
                type="submit" 
                disabled={data.every(s => s.status !== "Draft")}
                onClick={handleSubmit}
                aria-disabled={data.every(s => s.status !== "Draft")}
                >
                    <Letter 
                        className='size-3 lg:size-4 [&_path]:stroke-white' 
                        aria-hidden='true'
                    />
                    Submit Results
                </Button>
            </div>
        </div>
        
    )
}