import Download from '../../../assets/svg/download-icon.svg?react'
import Transcript from '../../../assets/svg/transcript-icon.svg?react'

export default function ResultsButtons({ className }){

    return(
        <div className={`flex justify-between gap-5 ${className}`}>
            <button type="button" className='rounded-[5px] h-fit text-brand-red border border-brand-red flex gap-2 items-center text-xs py-1 px-3'>
                <Transcript />
                View Transcript
            </button>
            <button type="button" className='flex gap-2 h-fit rounded-[5px] items-center text-white bg-brand-red border border-brand-red text-xs py-1 px-2.5'>
                <Download />
                Download Result
            </button>
        </div>
    )
}