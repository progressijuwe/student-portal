import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import logo from '../../../assets/images/portal-logo.png'
import Logout from '../../../assets/svg/logout.svg?react'
import { studentLinks, lecturerLinks, adminLinks } from './sidebarLinks'
import { useEffect, useRef } from 'react'

const roleLinksMap = {
  Student: studentLinks,
  Lecturer: lecturerLinks,
  Admin: adminLinks
}

export default function Sidebar({ 
  isOpen = false, 
  onClose 
}) {

  const { user } = useAuth()
  const role = user?.role || "Student"
  const links = roleLinksMap[role] || studentLinks
  
  const navigate = useNavigate();
  const sidebarRef = useRef(null)

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  useEffect(() => {
    if (isOpen && sidebarRef.current) {
      sidebarRef.current.focus()
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        tabIndex={-1}
        aria-label="Sidebar navigation"
        aria-hidden={!isOpen}
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen max-w-60 w-full bg-white
          flex flex-col justify-between
          border-r border-border px-5 py-6

          transform transition-transform duration-300 ease-in-out

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Top */}
        <div className='flex flex-col items-center gap-8'>
          <img src={logo} alt='School Logo' className='w-17.25 h-17.25 object-cover' />

          <nav 
            className='flex flex-col w-full gap-6' 
            aria-label={`${role} navigation`}
          >
            {links.map(item => (
              <NavLink 
                key={item.path}
                to={item.path}
                onClick={onClose}
                aria-label={item.text}
                className={({isActive}) =>
                  `flex gap-2 items-center w-full rounded-lg p-3 text-sm ${
                    isActive 
                      ? 'bg-brand font-semibold text-brand-orange' 
                      : 'font-medium text-body'
                  }`
                }
              >
                {({isActive}) => (
                  <>
                    {item.Icon && (
                      <item.Icon className={`w-4 h-4 ${
                        isActive 
                          ? '[&_path]:stroke-brand-orange' 
                          : '[&_path]:stroke-body'
                      }`} />
                    )}
                    {item.text}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom */}
        <button 
          onClick={handleLogout}
          aria-label="Log out"
          className='text-sm text-brand-red flex gap-2 items-center'
        >
          <Logout /> Log out
        </button>
      </aside>
    </>
  );
}