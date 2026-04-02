import Camera from '../../../assets/svg/camera.svg?react'
import Edit from '../../../assets/svg/edit.svg?react'
import Save from '../../../assets/svg/save.svg?react'
import ProfilePhoto from '../../../assets/images/profile.jpg'
import { Button } from '../../../components/ui/Button'

export default function ProfileCard(){

    return(
        <div className="bg-white py-5 px-2 lg:px-9 rounded-[10px] w-full flex flex-col lg:flex-row justify-between items-center gap-3.5">
            <div className='flex flex-col lg:flex-row items-center gap-5 lg:gap-9'>
                <span className='relative'>
                    <img src={ProfilePhoto} alt="Profile Photo" className="rounded-full w-25 h-25 lg:w-34 lg:h-34 object-cover border border-brand-orange" />
                    <Camera className='absolute bottom-0 right-0' />
                </span>
                <div className='flex flex-col items-center lg:items-start gap-0 lg:gap-3'>
                    <div className='flex flex-col gap-1'>
                        <h3 className='font-semibold text-sm lg:text-xl text-center lg:text-left'>Stephanie Zikora Obi</h3>
                        <div className='flex text-xs lg:text-sm gap-1 font-medium'>
                            <span className='text-brand-orange'>ID: SOF/22U/100098 | </span>
                            <span className='text-label'> BSc. Software Engineering</span>
                        </div>
                    </div>
                    
                    <div className='flex gap-0 lg:gap-5 items-center text-xs lg:text-sm'>
                        <span className='px-2.5 py-1.25 lg:bg-[#DFDFDF94] rounded-[10px] font-medium text-label'>Year: 4th Year</span>
                        <span className='px-2.5 py-1.25 lg:bg-[#DFDFDF94] rounded-[10px] font-medium text-label'>CGPA: 3.77</span>
                    </div>
                </div>
            </div>
            <div className='flex gap-5 items-center text-xs lg:text-sm'>
                <Button>
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