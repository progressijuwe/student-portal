
import DashboardCards from '../../sections/admin/dashboard/DashboardCards'
import PendingActions from '../../sections/admin/dashboard/PendingActions'
import QuickActions from '../../sections/admin/dashboard/QuickActions'
import RecentActivity from '../../sections/admin/dashboard/RecentActivity'

export default function AdminDashboardPage(){
    
    return(
        <div className="px-5 lg:px-8 py-8 lg:py-6 flex flex-col gap-8 lg:gap-9">
            <h2 className="text-xl lg:text-[30px] font-semibold text-black">Welcome back, Admin.</h2>
            <div className='flex flex-col lg:flex-row gap-10 lg:gap-4'>
                <div className='w-full flex flex-col gap-5'>
                    <DashboardCards />
                    <QuickActions />
                </div>
                    <PendingActions />
            </div>
            <div>
                <div className='flex flex-col gap-10'>
                    <RecentActivity />
                </div>
            </div>
            
        </div>
    )
}