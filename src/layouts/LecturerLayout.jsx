import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from '../sections/shared/Header';
import Sidebar from '../sections/shared/Sidebar/Sidebar';

export default function LecturerLayout() {
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
				role='Lecturer'
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
			/>

			<div className='flex flex-col w-full md:overflow-y-auto'>
				<Header
					role='Lecturer'
					onMenuClick={() => setIsSidebarOpen(true)}
				/>
				<main className='flex-1 font-body bg-[#F9F9FFFC] pb-9'>
					<Outlet />
				</main>
			</div>
		</div>
	);
}
