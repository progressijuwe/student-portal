import Files from '../../../assets/svg/files.svg?react'
import Transcript from '../../../assets/svg/transcript.svg?react'
import Date from '../../../assets/svg/date.svg?react'
import Download from '../../../assets/svg/download.svg?react'

const downloads = [
    {icon: <Transcript />, label: "Unofficial Transcript", docType: "pdf", lastUpdated: "4 wks ago"},
    {icon: <Date />, label: "Class Schedule", docType: "pdf", semester: "1st Semester 2025/2026"}
]

export default function ProfileDownloads(){

    return(
        <div className='flex flex-col gap-3 lg:max-w-81 w-full'>
            <span className='flex gap-2.5'>
                <Files className='size-5 lg:size-6' />
                <h4 className="text-sm lg:text-xl font-semibold text-black">Quick Downloads</h4>
            </span>
            <div className='py-7 px-9.5 flex flex-col gap-4.5 bg-white rounded-[10px]'>
                {downloads.map((record) => (
                    <div className='flex items-center justify-between' key={record.label}>
                        <div className='flex gap-2.5 items-center'>
                            {record.icon}
                            <div>
                                <p className='text-sm font-semibold text-black'>{record.label}</p>
                                <span className='flex gap-1 text-xs text-label font-medium'>
                                    <p className='uppercase'>{record.docType} |</p>
                                    <p>{record.lastUpdated ?? record.semester}</p>
                                </span>
                            </div>
                        </div>
                        <button type='button'>
                            <Download />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}