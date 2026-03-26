import ResultsButtons from "./ResultsButtons"

export default function ResultsTable(){

    const courses = [
        { code: 'SEN 401', title: 'Software Project Management',  credits: 3, grade: 'A',  point: '4.00' },
        { code: 'SEN 402', title: 'Software Construction',        credits: 2, grade: 'A-', point: '4.00' },
        { code: 'SEN 403', title: 'Object Oriented Design',       credits: 2, grade: 'A',  point: '4.00' },
        { code: 'SEN 406', title: 'AI and Expert Systems',        credits: 3, grade: 'A',  point: '4.00' },
        { code: 'CSC 409', title: 'Computer Networks',            credits: 3, grade: 'B+', point: '4.00' },
        { code: 'MTH 411', title: 'Numerical Analysis',           credits: 3, grade: 'A',  point: '4.00' },
        { code: 'SEN 405', title: 'Database Design and Administration', credits: 3, grade: 'A', point: '4.00' },
    ]

    const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0)
    const semesterGpa  = '3.89'

    const gradeColor = (grade) => {
        if (grade.startsWith('A')) return 'bg-[#DCFCE7] text-[#016630]'
        if (grade.startsWith('B')) return 'bg-[#D9E9FF] text-[#002C7D]'
        if (grade.startsWith('C')) return 'bg-[#FFF600] text-[#A65F00]'
        if (grade.startsWith('D')) return 'bg-[#FFCAFE] text-[#A600A3]'
        if (grade.startsWith('E')) return 'bg-[#FFE7D9] text-[#FE6201]'
        if (grade.startsWith('F')) return 'bg-[#FFE2E2] text-[#CC1100]'
        return 'bg-red-100 text-red-700'
    }

    return(
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4">
                <h3 className="hidden lg:block text-xl font-semibold text-dark">Course Results - 2025/2026 - 1st Semester</h3>
                <div className="flex flex-col border border-brand-red rounded-[10px]">
                    <table className="w-full text-xs">
                        <thead>
                        <tr className="text-left text-xs text-black font-semibold">
                            <th className="py-2 px-2 lg:px-5">Course Code</th>
                            <th className="py-2 px-px lg:px-5">Course Title</th>
                            <th className="py-2 px-0.5 lg:px-5">Credit Units</th>
                            <th className="py-2 px-0.5 lg:px-5">Final Grade</th>
                            <th className="py-2 px-0.5 lg:px-5">Grade Point</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {courses.map((course, i) => (
                            <tr key={course.code} className={`min-h-15 border-b border-[#D0D0D0] ${i % 2 === 0 ? '' : ''}`}>
                                <td className="py-2 px-0.75 lg:px-5 font-semibold text-brand-red">{course.code}</td>
                                <td className="py-2 px-0.5 lg:px-5">{course.title}</td>
                                <td className="py-2 px-0.5 lg:px-5">{course.credits}</td>
                                <td className="py-2 px-0.5 lg:px-5">
                                    <span className={`text-xs font-semibold px-2.5 py-px rounded-[5px] ${gradeColor(course.grade)}`}>
                                    {course.grade}
                                    </span>
                                </td>
                                <td className="py-2 px-1 lg:px-5 font-medium text-center">{course.point}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between items-center px-2.5 lg:px-8 py-3 lg:py-4 border-t border-gray-100">
                        <span className="text-xs font-medium text-[#4D4D4D]">
                            Total Credit Units: <span className="text-xl text-brand-red">{totalCredits}</span>
                        </span>
                        <span className="text-xs font-medium text-[#4D4D4D]">
                            Semester GPA: <span className="text-xl text-brand-red">{semesterGpa}</span>
                        </span>
                    </div>
                </div>
            </div>
            
            <ResultsButtons className='lg:hidden' />
        </div>
    )
}