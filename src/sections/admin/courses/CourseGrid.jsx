import CourseCard from "../../../components/ui/CourseCard"
import UserTableSkeleton from "../../../components/shared/UserTableSkeleton"
import EmptyState from "../../../components/ui/EmptyState"
import ErrorState from "../../../components/ui/ErrorState"

export default function CourseGrid({ courses = [], loading, error, onRetry, onEdit, onDelete }) {
    if (loading) return <UserTableSkeleton cols={3} cards={6} />
    if (error)   return <ErrorState title="Failed to load courses" description="Something went wrong." onRetry={onRetry} />
    if (!courses.length) return <EmptyState title="No courses found" description="Courses will appear here once added." />

    return (
        <section aria-label="Courses list" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                <CourseCard
                    key={course.id}
                    course={course}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
                ))}
            </div>
        </section>
    )
}