import ClassCalendar from "../sections/dashboard/ClassCalendar";
import GpaChart from "../sections/dashboard/GpaChart";
import StatCards from "../sections/dashboard/StatCards";


export default function DashboardPage() {
  return (
    <div className='py-5 px-6 md:px-8 flex flex-col gap-6'>
      <h2 className='font-semibold text-xl md:text-3xl'>Hello, Miss Stephanie.</h2>
      <div className="flex flex-col gap-8">
        <StatCards />
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <GpaChart />
          <ClassCalendar />
        </div>
      </div>
    </div>
  )
}