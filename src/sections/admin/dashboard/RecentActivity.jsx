import { ACTIVITY_CONFIG } from '../../../constants/activityConfig.js'
import ClockIcon from '../../../assets/svg/clock.svg?react'

// ── replace with API data ──
const activities = [
  {
    id: 1,
    type: 'student',
    title: 'Jennifer Kamalu Eze',
    meta: ['Bsc. Software Engineering', '1st Year'],
    label: 'Student added',
    time: '29 mins ago',
  },
  {
    id: 2,
    type: 'course',
    title: 'Human Computer Interaction',
    meta: ['SEN 411', '4th Year'],
    label: 'Course added',
    time: '1 hour ago',
  },
  {
    id: 3,
    type: 'student',
    title: 'Fatima Salem Bashir',
    meta: ['Bsc. Business Administration', '1st Year'],
    label: 'Student added',
    time: '2 hours ago',
  },
  {
    id: 4,
    type: 'lecturer',
    title: 'Dr. Hadiza Abbah',
    meta: ['Faculty of Computing', 'Software Engineering Department'],
    label: 'Lecturer added',
    time: '5 hours ago',
  },
]

function ActivityIcon({ type }) {
  const config = ACTIVITY_CONFIG[type]
  if (!config) return null
  const { Icon, bg, color } = config

  return (
    <span
      aria-hidden="true"
      style={{ backgroundColor: bg, '--icon-color': color }}
      className="p-1 lg:p-2 rounded-[5px] lg:rounded-[10px] shrink-0 [&>svg>path]:stroke-(--icon-color) [&>svg]:size-3 lg:[&>svg]:size-6"
    >
      <Icon />
    </span>
  )
}

function ActivityItem({ type, title, meta, label, time }) {
  return (
    <li className="flex flex-col lg:flex-row justify-between gap-1.25 lg:gap-4">
      <div className="flex items-start lg:items-center gap-2.5 lg:gap-10">
        <ActivityIcon type={type} />
        <div className="flex flex-col gap-2">
          <p className="text-xs lg:text-sm font-medium text-black">
            {title}
            {meta.map((m, i) => (
              <span key={`${m}-${i}`} className="font-normal"> 
                <span aria-hidden="true"> | </span> 
                {m}
              </span>
            ))}
          </p>
          <span className="text-[10px] lg:text-xs font-medium text-label">{label}</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0 text-label pl-7">
        <ClockIcon aria-hidden="true" className="size-3.75 lg:size-4" />
        <time 
          dateTime="2026-04-14T06:30:00Z"
          className="text-[10px] lg:text-xs font-medium text-nowrap"
        >
          {time}
        </time>
      </div>
    </li>
  )
}

export default function RecentActivity() {
  return (
    <section
      className="bg-white rounded-[10px] drop-shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1)] flex flex-col gap-5 lg:gap-8 px-6 lg:px-12 py-5 lg:py-8 border border-border w-full"
      aria-labelledby="recent-activity-heading"
    >
      <h2 id="recent-activity-heading" className="text-sm lg:text-base font-semibold text-black">Recent Activity</h2>
      {activities.length === 0 ? (
        <p className="text-sm text-label py-6 text-center">No recent activity</p>
      ) : (
        <ul className='flex flex-col gap-4'>
          {activities.map((activity) => (
            <ActivityItem key={activity.id} {...activity} />
          ))}
        </ul>
      )}
    </section>
  )
}