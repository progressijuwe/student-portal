import Person from '../../../assets/svg/person.svg?react'

export default function ProfileInfo({ user }){

    const isStudent = user.role === "student"

    const details = [
        {
            label: "full name",
            value: `${user.prefix ? user.prefix + " " : ""}${user.name}`
        },
        {
            label: "school email",
            value: user.email
        },
        {
            label: "phone number",
            value: user.phone
        },
        {
            label: "date of birth",
            value: user.dob
        },
        {
            label: "emergency contact",
            value: `${user.emergencyContactName} (${user.emergencyContactNumber})`
        },
        {
            label: "address",
            value: user.address
        }
    ]

    return(
        <div className='flex flex-col gap-2 lg:gap-3 w-full'>
            <span className='flex items-center gap-2.5'>
                <Person className='size-5 lg:size-6' />
                <h3 className='font-semibold text-sm lg:text-xl text-black'>
                    Personal Information
                </h3>
            </span>

            <div className='bg-white w-full p-5 lg:px-8 grid grid-cols-2 gap-7 lg:gap-8'>
                {details.map((detail) => (
                    <div key={detail.label} className='flex flex-col gap-2 text-xs lg:text-sm'>
                        <p className='uppercase text-label font-medium'>
                            {detail.label}
                        </p>
                        <p className='text-black font-semibold'>
                            {detail.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}