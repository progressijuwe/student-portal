import Camera from '../../../assets/svg/camera.svg?react'
import Edit from '../../../assets/svg/edit.svg?react'
import Save from '../../../assets/svg/save.svg?react'
import { Button } from '../../../components/ui/Button'



export default function ProfileCard({
    role,
    prefix,
    name,
    id,
    dept,
    faculty,
    studyYear,
    CGPA,
    profilePhoto
}){

    const isStudent = role === "student"

    return(
        <div className="bg-white py-5 px-2 lg:px-9 rounded-[10px] w-full flex flex-col lg:flex-row justify-between items-center gap-3.5">
            <div className='flex flex-col lg:flex-row items-center gap-5 lg:gap-9'>
                <span className='relative'>
                    <img 
                        src={profilePhoto} 
                        alt="Profile Photo" 
                        className="rounded-full w-25 h-25 lg:w-34 lg:h-34 object-cover border border-brand-orange" 
                    />
                    <Camera className='absolute bottom-0 right-0' />
                </span>

                <div className='flex flex-col items-center lg:items-start gap-2 lg:gap-3'>
                    
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-0.75'>
                            <h3 className='font-semibold text-sm lg:text-xl text-center lg:text-left'>
                                {prefix && `${prefix} `}{name}
                            </h3>

                            <div className='flex text-xs lg:text-sm gap-1 font-medium'>
                                <span className='text-brand-orange'>{id} |</span>
                                <span className='text-label'>{dept}</span>
                            </div>
                        </div>
                        

                        {/* Lecturer only */}
                        {!isStudent && faculty && (
                            <span className='w-fit text-sm px-2.5 py-1.25 rounded-[10px] bg-brand text-brand-orange'>{faculty}</span>
                        )}
                    </div>

                    {/* Student only */}
                    {isStudent && (
                        <div className='flex gap-5 items-center text-xs lg:text-sm'>
                            <span className='px-2.5 py-1.25 lg:bg-[#DFDFDF94] rounded-[10px] font-medium text-label'>
                                Year: {studyYear}
                            </span>
                            <span className='px-2.5 py-1.25 lg:bg-[#DFDFDF94] rounded-[10px] font-medium text-label'>
                                CGPA: {CGPA}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className='flex gap-5 items-center text-xs lg:text-sm'>
                <Button variant='secondary'>
                    <Edit />
                    Edit Profile
                </Button>
                <Button>
                    <Save />
                    Save Profile
                </Button>
            </div>
        </div>
    )
}