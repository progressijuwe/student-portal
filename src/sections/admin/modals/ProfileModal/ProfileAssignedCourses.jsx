import { useState } from "react"
import AcademicSession from "../../../student/results/AcademicSession"
import { Button } from "../../../../components/ui/Button"

const DEFAULT_SESSION = "2025/2026 1st Semester"

export default function ProfileAssignedCourses({ user, onViewResults }) {
    const [session, setSession] = useState(DEFAULT_SESSION)

    const coursesBySession = user?.courses ?? {}
    const courses = coursesBySession[session] ?? []

    return (
        <div className="flex flex-col gap-6 px-4">
            <AcademicSession value={session} onChange={setSession} />

            <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50/60 p-3 sm:p-4">
                {courses.length === 0 ? (
                    <p className="py-6 text-center text-sm text-gray-500">
                        No courses assigned for this semester.
                    </p>
                ) : (
                    courses.map((course) => (
                        <div
                            key={course.code}
                            className="flex flex-col gap-3 rounded-[5px] border border-border bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-7 sm:py-2"
                        >
                            <div className="flex flex-col min-w-0">
                                <p className="text-sm font-semibold">
                                    <span className="text-brand-orange">{course.code}</span>
                                    <span className="mx-1 text-brand-blue-border">|</span>
                                    <span className="text-brand-blue-border">{course.units} Units</span>
                                </p>
                                <p className="text-base font-medium text-black wrap-break-word">
                                    {course.title}
                                </p>
                            </div>

                            <Button
                                variant="primary"
                                onClick={() => onViewResults?.(course)}
                                className="w-full sm:w-fit"
                            >
                                View Results
                            </Button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}