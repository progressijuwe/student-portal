import profilePhoto from '../../../assets/images/profile.jpg'
import Settings from '../../../assets/svg/settings.svg?react'
import Notifs from '../../../assets/svg/notification-bell.svg?react'
import Hamburger from '../../../assets/svg/hamburger.svg?react'
import Logo from '../../../assets/images/portal-logo.png'

// ── replace with API data ──
const testUsers = [
  {
    name: "Stephanie Zikora Obi",
    year: "4th",
    dept: "Software Engineering",
    profilePicture: profilePhoto,
    role: "Student",
  },
  {
    name: "Oliver Ama Bassey",
    dept: "Software Engineering",
    profilePicture: profilePhoto,
    role: "Lecturer",
  },
]

export function Header({ role = "Student", onMenuClick }) {
  const currentUser = testUsers.find(u => u.role === role)
  const isStudent = role === "Student"

  return (
    <header className="border-b border-border px-6 py-4 flex gap-11 items-center justify-between md:justify-end">
      
      <button onClick={onMenuClick} className="md:hidden">
        <Hamburger />
      </button>

      <img src={Logo} alt='Portal Logo' className='w-10.5 h-10.5 object-cover md:hidden' />

      <div className='flex gap-2 items-center'>
        <img
          src={currentUser.profilePicture}
          alt='Profile Photo'
          className='w-7.5 h-7.5 object-cover rounded-full border border-brand-border'
        />

        <div className='hidden md:flex flex-col text-black'>
          <p className='font-semibold text-xs'>{currentUser.name}</p>
          <p className='text-xs'>
            {isStudent
              ? `${currentUser.year} Year, BSc, ${currentUser.dept}`
              : `${currentUser.role}, ${currentUser.dept} Department`
            }
          </p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className='items-center gap-6 hidden md:flex'>
        <button type='button'><Settings /></button>
        <button type='button'><Notifs className='w-6 h-6 fill-brand-red' /></button>
      </div>
    </header>
  )
}