import Card from '../../../components/ui/Card'
import TimelineIcon from '../../../assets/svg/timeline.svg?react'
import BadgeIcon from '../../../assets/svg/badge.svg?react'
import CalendarIcon from '../../../assets/svg/calendar.svg?react'
import PeopleIcon from '../../../assets/svg/people.svg?react'

const countAttended = 88
const countTotal = 102

const attendancePercent = Math.round((countAttended / countTotal) * 100)

const stats = [
    {
        label: 'Grade Point Average',
        icon: <TimelineIcon />,
        value: '3.89',
        suffix: '/4.00',
        variant: 'gpa',
        badge: '+0.14 pts',
    },
    {
        label: 'Cumulative Grade Point Average',
        icon: <BadgeIcon />,
        value: '3.77',
        suffix: '/4.00',
        variant: 'gpa',
        badge: '+0.05 pts',
    },
    {
        label: 'Attendance',
        icon: <PeopleIcon />,
        value: `${attendancePercent}%`,
        variant: 'attendance',
        countAttended,
        countTotal,
        percent: attendancePercent,
    },
    {
        label: 'Next Class',
        icon: <CalendarIcon />,
        value: 'SEN 406',
        variant: 'next-class',
        course: 'Human Computer Interaction',
        time: '11:00am',
    },
]

const getCardSlots = (stat) => {
  switch (stat.variant) {
    case 'gpa':
      return {
        footer: (
          <div className="flex items-center gap-2 justify-between">
            <span className="text-xs text-label font-medium">compared to last semester</span>
            <Badge>{stat.badge}</Badge>
          </div>
        ),
      }
    case 'attendance':
      return {
        footer: <span className="text-xs text-label font-medium">You have attended class {stat.countAttended}/{stat.countTotal} times</span>,
      }
    case 'next-class':
      return {
        footer: <span className="text-xs text-label font-medium">{stat.course} - {stat.time}</span>,
      }
  }
}

export default function StatCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat) => (
        <Card key={stat.label} {...stat} {...getCardSlots(stat)} />
      ))}
    </div>
  )
}

function Badge({ children }){
    return(
        <span className='text-[8px] md:text-[10px] font-medium border border-badge-border bg-badge text-badge-border px-1.25 py-0.75 rounded-[20px] text-nowrap'>
            {children}
        </span>
    )
}