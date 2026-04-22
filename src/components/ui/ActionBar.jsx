export default function ActionBar({ children, className = "" }) {
    return (
        <div className={`w-full flex flex-col sm:flex-row justify-end gap-2 sm:gap-5 ${className}`}>
            {children}
        </div>
    )
}