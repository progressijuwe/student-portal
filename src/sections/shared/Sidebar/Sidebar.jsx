import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/images/portal-logo.png'
import Logout from '../../../assets/svg/logout.svg?react'
import { studentLinks, lecturerLinks } from './sidebarLinks'

export default function Sidebar({ 
  role = "Student", 
  isOpen = false, 
  onClose 
}) {

  const links = role === "Lecturer" ? lecturerLinks : studentLinks;
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen w-64 bg-white
          flex flex-col justify-between
          border-r border-border px-5 py-6

          transform transition-transform duration-300 ease-in-out

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Top */}
        <div className='flex flex-col items-center gap-8'>
          <img src={logo} alt='School Logo' className='w-17.25 h-17.25' />

          <nav className='flex flex-col w-full gap-6'>
            {links.map(item => (
              <NavLink 
                key={item.path}
                to={item.path}
                onClick={onClose}
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
          className='text-sm text-brand-red flex gap-2 items-center'
        >
          <Logout /> Log out
        </button>
      </aside>
    </>
  );
}