import { Link } from 'react-router-dom'
import profilePhoto from '../../../assets/images/profile.jpg'
import Settings from '../../../assets/svg/settings.svg?react'
import Notifs from '../../../assets/svg/notification-bell.svg?react'
import Hamburger from '../../../assets/svg/hamburger.svg?react'
import Logo from '../../../assets/images/portal-logo.png'

export function Header() {
  return (
    <header className="border-b border-border px-6 py-4 flex gap-11 items-center justify-between md:justify-end">
      <Hamburger className='md:hidden' />
      <img src={Logo} alt='Portal Logo' className='w-10.5 h-10.5 object-cover md:hidden'/>
      <div className='flex gap-2 items-center'>
        <img 
          src={profilePhoto} 
          alt='Profile Photo'
          className='w-7.5 h-7.5 object-cover rounded-full border border-brand-border'
        />
        <div className='hidden md:flex flex-col text-black'>
          <p className='font-semibold text-xs'>Stephanie Zikora Obi</p>
          <p className='text-xs'>4th Year, BSc, Software Engineering</p>
        </div>
      </div>
      <div className='items-center gap-6 hidden md:flex'>
        <button type='button'>
          <Settings />
        </button>
        <button type='button' className=''>
          <Notifs className='w-6 h-6 fill-brand-red'/>
        </button>
      </div>
    </header>
  )
}