import Course from '../../../assets/svg/courses.svg?react'

export default function CoursePane(){
    const details = [
        {label: "level", value: "400 Lvl"},
        {label: "Credit Units", value: "3"},
        {label: "Semester", value: "Second"},
        {label: "Enrolled Students", value: "8"},
    ]
    return(
        <section className="bg-white rounded-[10px] p-6 border border-[#D9D9DF] flex flex-col gap-4">
            <div className='flex items-center gap-3'>
                <span className='bg-[#FFEDD4] p-1 md:p-3 rounded-[5px]'>
                    <Course className='size-4 md:size-6' />
                </span>
                <div className='flex flex-col'>
                    <h3 className='font-semibold text-base md:text-xl text-[#101828]'>SEN 401</h3>
                    <p className='text-sm md:text-base text-label'>Software Engineering Security</p>
                </div>
            </div>
            <div className='grid grid-cols-4 border-t border-[#E5E7EB] py-4'>
                {details.map((det) => (
                    <div key={det.label} className='flex flex-col w-fit'>
                        <span className='text-[10px] md:text-sm text-label leading-5 text-nowrap capitalize'>{det.label}</span>
                        <p className='text-xs md:text-base font-medium text-[#101828]'>{det.value}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}