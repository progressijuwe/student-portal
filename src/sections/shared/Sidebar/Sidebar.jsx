import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/images/portal-logo.png'
import Logout from '../../../assets/svg/logout.svg?react'
import { studentLinks, lecturerLinks } from './sidebarLinks'

export default function Sidebar({ role = "Student" }){
    const links = role === "Lecturer" ? lecturerLinks : studentLinks
    const navigate = useNavigate();

    const handleLogout = () => {

        // Redirect to login
        navigate("/", { replace: true });
    };

    return(
        <aside className='flex-col gap-32 max-w-60 border-r border-border px-5 w-full shrink-0 font-body sticky top-0 h-screen hidden md:flex'>
            <div className='flex flex-col items-center gap-8 py-8'>
                <img 
                    src={logo} 
                    alt='School Logo' 
                    className='w-17.25 h-17.25 object-cover' 
                />
                <nav className='flex flex-col w-full gap-6'>
                    {links.map(item => (
                        <NavLink 
                            key={item.path}
                            to={item.path}
                            end={item.path === '/'}
                            className={({isActive}) => `flex gap-2 items-center w-full rounded-lg p-3 text-sm ${isActive ? 'bg-brand font-semibold text-brand-orange' : 'font-medium text-body'}`}
                        >
                            {({isActive}) => (
                                <>
                                    {item.Icon && (
                                        <item.Icon className={`w-4 h-4 shrink-0 ${isActive ? '[&_path]:stroke-brand-orange' : '[&_path]:stroke-body'}`} />
                                    )}
                                    {item.text}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>
            <button type='button' onClick={handleLogout} className='px-3 text-sm text-left font-medium text-brand-red cursor-pointer flex gap-1 items-center'>
                <Logout />Log out
            </button>
        </aside>
    )
}