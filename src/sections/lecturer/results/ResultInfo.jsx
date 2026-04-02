import Results from '../../../assets/svg/results.svg?react'
import Letter from '../../../assets/svg/letter.svg?react'
import Approved from '../../../assets/svg/approved.svg?react'
import GradingInfo from './GradingInfo'


export default function ResultInfo({ code, title, submittedCount, approvedCount }){
    const submitted = {
        bg: '#EFF6FF', border: '#BEDBFF', text: '#193CB8', value: '#1C398E'
    }
    const approved = {
        bg: '#F0FDF4', border: '#B9F8CF', text: '#016630', value: '#0D542B'
    }
    const stats = [
        { label: 'Submitted', count: submittedCount, Icon: Letter,   ...submitted },
        { label: 'Approved',  count: approvedCount, Icon: Approved, ...approved  },
    ]

    return(
        <section className="p-3 lg:p-4 rounded-[10px] bg-white drop-shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1)]" aria-label='Result Information'>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-7">
                    <div className="flex gap-3 items-center">
                        <span className='rounded-[10px] p-3 bg-[#FFEDD4]'><Results aria-hidden='true' className='size-6 [&_path]:stroke-brand-orange' /></span>
                        <div className="flex flex-col">
                            <h3 className="font-semibold text-[#101828] text-sm lg:text-base">{code}</h3>
                            <p className="text-sm text-[#4A5565] lg:text-base">{title}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 max-w-177.5'>
                        {stats.map((stat) => (
                            <div key={stat.label} style={{ background: stat.bg, borderColor: stat.border }}
                            className='flex gap-4 items-center justify-between w-full border rounded-[10px] p-4'>
                                <dl className='flex flex-col gap-1 lg:gap-0.5'>
                                    <dt className='text-xs lg:text-sm' style={{ color: stat.text }}>{stat.label}</dt>
                                    <dd className='text-sm lg:text-base font-semibold' style={{ color: stat.value }}>{stat.count}</dd>
                                </dl>
                                <stat.Icon className='size-8' />
                            </div>
                        ))}
                    </div>
                </div>
                <GradingInfo />
            </div>
            
        </section>
    )
}