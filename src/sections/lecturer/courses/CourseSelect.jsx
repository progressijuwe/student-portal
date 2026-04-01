

export default function CourseSelect(){

    const selectOptions = [
        {value: 'Software Project Management'},
        {value: 'Software Construction'},
        {value: 'Object Oriented Design'}
    ]

    return(
        <section className="flex flex-col gap-2 w-full max-w-185">
            <h2 className="text-sm md:text-base text-label font-medium">Select Course</h2>
            <select defaultValue="" className="border border-[#D1D5DC] rounded-[10px] p-2">
                <option value="" disabled></option>
                {selectOptions?.filter(opt => opt.value !== '').map((opt) => (
                    <option key={opt.value} value={opt.value} className="capitalize text-sm">{opt.value}</option>
                ))}
            </select>
        </section>
    )
}