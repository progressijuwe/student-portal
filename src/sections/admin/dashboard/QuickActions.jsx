import Person from '../../../assets/svg/add-person.svg?react'
import Plus from '../../../assets/svg/plus.svg?react'
import Course from '../../../assets/svg/courseIcon.svg?react'
import View from '../../../assets/svg/view.svg?react'

export default function QuickActions(){
    const actions = [
        { label: "Add Student", Icon: Person, PlusIcon: Plus, bgColor: "#DBEAFE", iconClass: "[&_path]:stroke-[#1447E6] [&_path]:fill-[#1447E6]" },
        { label: "Add Lecturer", Icon: Person, PlusIcon: Plus, bgColor: "#FFEDD4", iconClass: "[&_path]:stroke-brand-orange [&_path]:fill-brand-orange" },
        { label: "Add Course", Icon: Course, PlusIcon: Plus, bgColor: "#DCFCE7", iconClass: "[&_path]:stroke-[#00A63E] [&_path]:fill-[#00A63E]"},
        { label: "View Course Reg", Icon: View, bgColor: "#F3E8FF", iconClass: "[&_path]:stroke-[#9810FA]"},
    ]

    return(
        <section className="flex flex-col gap-5 lg:gap-4 bg-white rounded-[20px] border border-border px-4 py-7">
            <h2 className="text-sm lg:text-base font-semibold text-black">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-7.5 lg:gap-5">
                {actions.map((item) => (
                    <button 
                        type='button'
                        className='flex flex-col gap-3 lg:gap-2 items-center border border-border rounded-[20px] px-10 lg:px-5 py-5 lg:py-5 '    
                    >
                        <span className='relative w-fit p-3 rounded-[10px]' style={{backgroundColor: item.bgColor}}>
                            <item.Icon className={`size-5 lg:size-6 ${item.iconClass}`} />
                            {item.PlusIcon && <item.PlusIcon className={`absolute top-1 right-1 ${item.iconClass}`} />}
                        </span>
                        <p className='font-medium text-xs lg:text-sm text-nowrap'>{item.label}</p>
                    </button>
                ))}
            </div>
        </section>
    )
}