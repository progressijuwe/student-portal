import { useState, useEffect } from 'react'
import Person from '../../../assets/svg/add-person.svg?react'
import Plus from '../../../assets/svg/plus.svg?react'
import Course from '../../../assets/svg/courseIcon.svg?react'
import View from '../../../assets/svg/view.svg?react'
import AddStudentModal from '../../../features/admin/AddStudentModal'

export default function QuickActions(){
    const [activeAction, setActiveAction] = useState(null)

    const actions = [
        { key: "add-student", label: "Add Student", Icon: Person, PlusIcon: Plus, bgColor: "#DBEAFE", iconClass: "[&_path]:stroke-[#1447E6] [&_path]:fill-[#1447E6]", Modal: AddStudentModal },
        { key: "add-lecturer", label: "Add Lecturer", Icon: Person, PlusIcon: Plus, bgColor: "#FFEDD4", iconClass: "[&_path]:stroke-brand-orange [&_path]:fill-brand-orange", Modal: AddStudentModal },
        { key: "add-course", label: "Add Course", Icon: Course, PlusIcon: Plus, bgColor: "#DCFCE7", iconClass: "[&_path]:stroke-[#00A63E] [&_path]:fill-[#00A63E]", Modal: AddStudentModal },
        { key: "view-course-reg", label: "View Course Reg", Icon: View, bgColor: "#F3E8FF", iconClass: "[&_path]:stroke-[#9810FA]", Modal: AddStudentModal },
    ]

    const ActiveModal = actions.find(a => a.key === activeAction)?.Modal

    useEffect(() => {
        if (!activeAction) return

        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setActiveAction(null)
            }
        }

        document.addEventListener("keydown", handleEsc)
        return () => document.removeEventListener("keydown", handleEsc)
    }, [activeAction])

    return(
        <section className="flex flex-col gap-5 lg:gap-4 bg-white rounded-[20px] border border-border px-4 py-7">
            
            <h2 className="text-sm lg:text-base font-semibold text-black">
                Quick Actions
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-7.5 lg:gap-5">
                {actions.map((item) => (
                    <button
                        key={item.key}
                        type='button'
                        onClick={() => setActiveAction(item.key)}
                        className='flex flex-col gap-3 lg:gap-2 items-center border border-border rounded-[20px] px-10 lg:px-5 py-5'
                    >
                        <span 
                            className='relative w-fit p-3 rounded-[10px]' 
                            style={{ backgroundColor: item.bgColor }}
                        >
                            <item.Icon className={`size-5 lg:size-6 ${item.iconClass}`} />
                            
                            {item.PlusIcon && (
                                <item.PlusIcon 
                                    className={`absolute top-1 right-1 ${item.iconClass}`} 
                                />
                            )}
                        </span>

                        <p className='font-medium text-xs lg:text-sm text-nowrap'>
                            {item.label}
                        </p>
                    </button>
                ))}
            </div>

            {ActiveModal && (
                <ActiveModal onClose={() => setActiveAction(null)} />
            )}
        </section>
    )
}