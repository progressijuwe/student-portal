import { NavLink } from 'react-router-dom'
import logo from '../../../assets/images/portal-logo.png'
import { links } from './sidebarLinks'

export default function Sidebar(){

    return(
        <aside className='flex-col gap-32 max-w-60 border-r border-border px-8 w-full shrink-0 font-body sticky top-0 h-screen hidden md:flex'>
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
                            className={({isActive}) => `w-full rounded-lg p-3 text-sm ${isActive ? 'bg-brand border-brand font-semibold text-brand-orange' : 'font-medium text-body border-0' }`}
                        >
                            {item.text}
                        </NavLink>
                    ))}
                </nav>
            </div>
            <button type='button' className='px-3 text-sm text-left font-medium text-brand-red cursor-pointer'>
                Log out
            </button>
        </aside>
    )
}