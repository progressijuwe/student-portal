import Info from '../../../assets/svg/info.svg?react'
import {assessmentComponents, gradeScale } from '../../../constants/grading.js'

export default function GradingInfo(){
    const total = assessmentComponents.reduce((sum, c) => sum + c.marks, 0)

    return(
        <div className='flex gap-2 items-start bg-[#EFF6FF] border border-[#BEDBFF] rounded-[10px] p-4'>
            <Info className='size-5 shrink-0' aria-hidden="true" />
            <div className='flex flex-col gap-1'>
                <h4 className='text-xs lg:text-sm font-medium text-[#1C398E]'>Grading System & Assessment Structure</h4>
                <p className='text-xs text-[#193CB8]'>
                    Assessment Components: {assessmentComponents.map(c => `${c.label} (${c.marks})`).join(' | ')} | Total: {total}
                </p>
                <p className='text-xs lg:text-sm text-[#193CB8]'>
                    Grade Scale: {gradeScale.map(g => `${g.grade}: ${g.min}-${g.max}`).join(' | ')}
                </p>
                <p className='text-[10px] lg:text-xs text-brand-blue-border'>
                    Note: Submitted results cannot be edited. Draft results can be modified anytime.
                </p>
            </div>
        </div>
    )
}