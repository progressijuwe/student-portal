import { Outlet } from 'react-router-dom'
import { Header } from '../sections/shared/Header'
import Sidebar  from '../sections/shared/Sidebar/Sidebar'

export default function StudentLayout() {
  return (
    <div className="flex h-screen overflow-hidden w-full">
      <Sidebar role="Student"/>
      <div className='flex flex-col w-full overflow-y-auto'>
        <Header role="Student"/>
        <main className="flex-1 font-body bg-[#F9F9FFFC]">
          <Outlet />
        </main>
      </div>
      
    </div>
  )
}