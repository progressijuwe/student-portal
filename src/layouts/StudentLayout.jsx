import { Outlet } from 'react-router-dom';
import { Header } from '../sections/shared/Header';
import Sidebar from '../sections/shared/Sidebar/Sidebar';
import { useState, useEffect } from 'react';

export default function StudentLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	useEffect(() => {
		document.body.style.overflow = isSidebarOpen ? 'hidden' : 'auto';

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isSidebarOpen]);

	return (
		<div className='flex md:h-screen md:overflow-hidden w-full'>
			<Sidebar
				role='Student'
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
			/>
			<div className='flex flex-col w-full md:overflow-y-auto'>
				<Header
					role='Student'
					onMenuClick={() => setIsSidebarOpen(true)}
				/>
				<main className='flex-1 font-body bg-[#F9F9FFFC]'>
					<Outlet />
				</main>
			</div>
		</div>
	);
}
