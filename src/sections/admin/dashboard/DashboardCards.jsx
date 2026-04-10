import TotalStudents from '../../../assets/svg/totalStudents.svg?react'
import People from '../../../assets/svg/people.svg?react'
import CourseIcon from '../../../assets/svg/courseIcon.svg?react'

export default function DashboardCards(){

    const details = [
        {label: "Total Students", value: 2980, Icon: TotalStudents, color: '#DBEAFE' },
        {label: "Total Lecturers", value: 129, Icon: People, color: '#FFEDD4'  },
        {label: "Total Courses", value: 68, Icon: CourseIcon, color: '#DCFCE7'  },
    ]

    return(
        <div className='flex shrink-0 w-full gap-5 overflow-x-auto md:overflow-visible'  style={{ scrollbarWidth: 'none'}}>
            {details.map((det) => (
                <div key={det.label} className='flex justify-between bg-white rounded-[20px] border border-brand-orange p-4 w-full max-w-40.5 shrink-0 md:shrink sm:max-w-67.5'>
                    <div className='flex flex-col gap-5'>
                        <p className='text-sm font-medium text-black'>{det.label}</p>
                        <span className='text-[40px] text-brand-red font-medium'>{det.value}</span>
                    </div>
                    {det.Icon && <span className='h-fit w-fit rounded-[10px] p-1.25 lg:p-2.5' style={{ backgroundColor: det.color}}><det.Icon className='size-3.75 lg:size-7.5' /></span>}
                </div>
            ))}
        </div>
    )
}