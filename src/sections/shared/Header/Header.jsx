import { useAuth } from '../../../context/AuthContext'
import Settings from '../../../assets/svg/settings.svg?react'
import Notifs from '../../../assets/svg/notification-bell.svg?react'
import Hamburger from '../../../assets/svg/hamburger.svg?react'
import Logo from '../../../assets/images/portal-logo.png'
import { Roles } from '../../../constants/roles'

export function Header({ onMenuClick }) {

  const { user, loading } = useAuth()

  if (loading) {
    return (
      <header className="border-b border-border px-6 py-4">
        <p className="text-sm text-label">Loading...</p>
      </header>
    )
  }

  const role = user?.role

  const isStudent = role === Roles.STUDENT
  const isLecturer = role === Roles.LECTURER
  const isAdmin = role === Roles.ADMIN

  const displayName = isAdmin ? "Admin User" : user?.name

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const initials = getInitials(displayName)

  const profileImage = user?.profilePicture

  return (
    <header className="border-b border-border px-6 py-4 flex gap-11 items-center justify-between md:justify-end">
      
      <button 
        onClick={onMenuClick} 
        className="md:hidden"
        aria-label="Open menu"
      >
        <Hamburger aria-hidden="true" />
      </button>

      <img 
        src={Logo} 
        alt='Portal logo' 
        className='w-10.5 h-10.5 object-cover md:hidden' 
      />

      <div className='flex gap-2 items-center'>

        {profileImage ? (
          <img
            src={profileImage}
            alt={`${displayName}'s profile`}
            className='w-7.5 h-7.5 object-cover rounded-full border border-brand-border'
          />
        ) : (
          <span className="text-[10px] font-extrabold text-white flex items-center justify-center rounded-full bg-brand-red border border-brand-orange p-1">
            {initials}
          </span>
        )}

        <div className='hidden md:flex flex-col text-black'>

          <p className='font-semibold text-xs'>
            {displayName}
          </p>

          {!isAdmin && (
            <p className='text-xs text-label'>
              {isStudent
                ? `${user?.studyYear || ""}, ${user?.dept || ""}`
                : `Lecturer, ${user?.dept || ""}`
              }
            </p>
          )}

        </div>
      </div>

      <div className='items-center gap-6 hidden md:flex'>
        
        <button 
          type='button'
          aria-label="Settings"
        >
          <Settings />
        </button>

        <button 
          type='button'
          aria-label="Notifications"
        >
          <Notifs className='w-6 h-6 fill-brand-red' />
        </button>

      </div>
    </header>
  )
}