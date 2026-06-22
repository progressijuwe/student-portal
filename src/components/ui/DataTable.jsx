import EmptyState from "./EmptyState"
import ErrorState from './ErrorState'

export default function DataTable({ 
    items = [], 
    loading = false, 
    error = null, 
    onRetry,
    columns,
    renderRow,
    renderCard,
    caption,
    headingId,
    Skeleton,
}) {
    if (loading) return <Skeleton />
    if (error) return <ErrorState title="Failed to load" description="Something went wrong." onRetry={onRetry} />
    if (!items.length) return <EmptyState title="No results found" description="Nothing to show here yet." />

    return (
        <section className="w-full" aria-labelledby={headingId}>
            <h2 id={headingId} className="sr-only">{caption}</h2>

            <div className="hidden lg:block w-full overflow-x-auto">
                <table className="w-full border border-border rounded-[10px] overflow-hidden">
                    <caption className="sr-only">{caption}</caption>
                    <thead className="bg-[#F9F9FF] text-left text-sm text-label">
                        <tr>
                        {columns.map((col) => (
                            <th key={col.key} scope="col" className={`py-3 px-2 font-medium ${col.className || ""}`}>
                            {col.label}
                            </th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => renderRow(item))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col gap-4 px-6 lg:hidden">
                {items.map((item) => renderCard(item))}
            </div>
        </section>
    )
}