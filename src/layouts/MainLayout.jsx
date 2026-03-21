import { Outlet } from 'react-router-dom'
import { Header } from '../sections/shared/Header'
import Sidebar  from '../sections/shared/Sidebar/Sidebar'

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden w-full">
      <Sidebar />
      <div className='flex flex-col w-full overflow-y-auto'>
        <Header />
        <main className="flex-1 bg-[#F9F9FFFC]">
          <Outlet />
        </main>
      </div>
      
    </div>
  )
}