import { Link } from 'react-router-dom'
import WarningIcon from  '../../../assets/svg/warning.svg?react'

const apiResponse = [
  {
    type: "course-registration",
    count: 12,
  },
  {
    type: "result",
    count: 10,
  },
]

const actionConfig = {
  "course-registration": {
    path: "/admin/course-registrations",
    section: "Course Registration",
    actionText: "Course registrations pending approval",
    actionLabel: "Requires attention",
  },
  "result": {
    path: "/admin/results",
    section: "Results",
    actionText: "Results pending approval",
    actionLabel: "Requires attention",
  }
}

const actions = apiResponse.map(item => ({
  ...actionConfig[item.type],
  count: item.count,
  id: item.type
}))

export default function PendingActions(){
    
    return(
        <section 
        aria-labelledby="pending-actions-heading"
        className="flex flex-col gap-6 border border-border lg:px-4 px-5 py-7.5 rounded-[10px] bg-white lg:max-w-66 shrink"
        >
            <div className="flex gap-2 items-center">
                <WarningIcon 
                aria-hidden="true"
                className='size-5'
                />
                <h2 
                id="pending-actions-heading"
                className="text-sm lg:text-base font-semibold text-black"
                >
                    Pending Actions
                </h2>
            </div>
            {actions.length === 0 ? (
                <p className="text-sm text-label py-6 text-center">No pending actions</p>
            ) : (
                <ul className='flex flex-col gap-4'>
                {actions.map((action) => (
                    <ActionCard key={action.id} {...action} />
                ))}
                </ul>
            )}
            
        </section>
    )
}

function ActionCard({ path, actionText, actionLabel, count }){
    return(
        <li 
        className='w-full'
        >
            <Link 
            to={path}
            className='flex justify-between gap-4 items-start bg-brand rounded-[10px] w-full py-5 lg:py-4 px-6 lg:px-4'
            >
                <div className='flex flex-col gap-2.5'>
                    <p className='text-xs lg:text-sm font-medium text-wrap'>{actionText}</p>
                    <span className='text-xs lg:text-sm font-medium text-label'>{actionLabel}</span>
                </div>
                <span 
                aria-label={`${count} pending items`}
                className='text-xs lg:text-sm p-2.5 rounded-[10px] bg-brand-red text-white font-black'
                >
                    {count}
                </span>
            </Link>
        </li>
    )
}