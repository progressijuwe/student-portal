import People from '../../../assets/svg/course.svg?react'
import { Button } from '../../../components/ui/Button'
import DownloadIcon from '../../../assets/svg/download-icon.svg?react'
import Search from '../../../assets/svg/search.svg?react'
import { Form } from 'react-router-dom'
import StudentTable from './StudentTable'

export default function CourseStudents(){

    return(
        <section className="bg-white flex flex-col">
            <div className="flex flex-col lg:flex-row gap-4 p-4 lg:p-6 lg:items-center lg:justify-between border-b border-[#E5E7EB]">
                <div className='flex gap-2'>
                    <People className='size-4 md:size-5 text-label'/>
                    <div className='flex flex-col'>
                        <h3 className='font-semibold text-base md:text-xl text-[#101828]'>Registered Students</h3>
                        <p className='font-medium text-sm md:text-base text-label'>14 Students enrolled</p>
                    </div>
                </div>
                <Button>
                    <DownloadIcon className='size-3.5 md:size-4' />
                    Export List
                </Button>
            </div>
            <Form method='get' action='#' className='w-full p-4 lg:p-6 border-b border-[#E5E7EB]'>
                <span className='flex items-center gap-2 w-full py-2 px-4 border border-[#D1D5DC] rounded-[10px]'>
                    <Search className='size-4 lg:size-5 text-label' />
                    <input type='search' id='registered-student-search' placeholder='Search by name or matric number...' className=' w-full text-xs lg:text-base font-medium placeholder:text-label' />
                </span>
            </Form>
            <StudentTable />
        </section>
    )
}