import Person from '../../../assets/svg/person.svg?react'

const details = [
    { label: "full name", text: "Stephanie Zikora Obi"},
    { label: "school email", text: "sobi@student.aust.edu.ng"},
    { label: "phone number", text: "+234-809-8331-005"},
    { label: "date of birth", text: "5th April, 2005"},
    { label: "address", text: "House 20A, Sunrise Valley Estate, Abuja"},
    { label: "emergency contact", text: "Ngozi Obi (+234- 904-9007-331)"},
]

export default function ProfileInfo(){

    return(
        <div className='flex flex-col gap-2 lg:gap-3 w-full'>
            <span className='flex items-center gap-2.5'>
                <Person className='size-5 lg:size-6' />
                <h3 className='font-semibold text-sm lg:text-xl text-black'>Personal Information</h3>
            </span>
            <div className='bg-white w-full p-5 lg:py-5 lg:px-8 grid grid-cols-2 justify-between gap-7 lg:gap-8'>
                {details.map((detail) => (
                    <span className='flex flex-col gap-1.5 lg:gap-2 font-medium lg:font-semibold text-xs lg:text-sm'>
                        <p className='uppercase text-label'>{detail.label}</p>
                        <p className='text-black text-wrap'>{detail.text}</p>
                    </span>
                ))}
            </div>
        </div>
    )
}