import { Outlet } from 'react-router-dom'
import { Header } from '../sections/shared/Header'
import Sidebar  from '../sections/shared/Sidebar/Sidebar'

export default function LecturerLayout() {
  return (
    <div className="flex md:h-screen md:overflow-hidden w-full">
      <Sidebar role="Lecturer" />
      <div className='flex flex-col w-full md:overflow-y-auto'>
        <Header role="Lecturer"/>
        <main className="flex-1 font-body bg-[#F9F9FFFC]">
          <Outlet />
        </main>
      </div>
      
    </div>
  )
}