

export default function CourseSelect({ options = [], value, onSelect }){

    const handleChange = (e) => {
        const selected = options.find(opt => opt.label === e.target.value)
        onSelect(selected)
    }

    return(
        <section className="flex flex-col gap-2 w-full max-w-185">
            <h2 className="text-sm md:text-base text-label font-medium">Select Course</h2>
            <select value={value.label || ""}  onChange={handleChange} className="border border-[#D1D5DC] rounded-[10px] p-2">
                {options.map((opt) => (
                    <option key={opt.label} value={opt.label} className="capitalize text-sm">{opt.label}</option>
                ))}
            </select>
        </section>
    )
}