import { useState } from 'react'
import TimetableCard from "./TimetableCard"
import TimetableDays from "./TimetableDays"
import Polygon1 from '../../../assets/svg/polygon-1.svg?react'
import Polygon2 from '../../../assets/svg/polygon-2.svg?react'
import No from '../../../assets/svg/no.svg?react'
import ClassPlaceholder from './ClassPlaceholder'

const classes = [
  { day: 'Monday',    startTime: "9:00",  endTime: "11:00", name: "Research Methodology",        code: "SEN 405", lecturer: "Dr. Mena Tar",      building: "NMI Building",  room: "Lecture Room 3" },
  { day: 'Monday',    startTime: "11:00", endTime: "13:00", name: "AI & Expert Systems",          code: "SEN 411", lecturer: "Dr. Adekunle John", building: "NMI Building",  room: "Lecture Room 2" },
  { day: 'Monday',    startTime: "14:00", endTime: "16:00", name: "Distributed Computing Systems", code: "SEN 408", lecturer: "Dr. Ibrahim Abbah", building: "AFDB Building", room: "Auditorium" },
  { day: 'Wednesday', startTime: "10:00", endTime: "12:00", name: "Software Engineering",         code: "SEN 401", lecturer: "Dr. Some One",      building: "NMI Building",  room: "Lecture Room 1" },
  // ...
]

const LUNCH_START = "13:00"
const LUNCH_END   = "14:00"

const toMinutes = (time) => {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
const defaultDay = ['Monday','Tuesday','Wednesday','Thursday','Friday'].includes(today) ? today : 'Monday'

export default function TimetableClass() {
  const [activeDay, setActiveDay] = useState(defaultDay)

  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes()
  const dayClasses = classes.filter(c => c.day === activeDay)
  const nextClass  = dayClasses.find(c => toMinutes(c.startTime) >= nowMinutes)

  return (
    <div className="flex flex-col gap-5 md:gap-6 items-center">
        <TimetableDays active={activeDay} onSelect={setActiveDay} />
        <div className='flex flex-col md:flex-row w-full gap-4 md:gap-10 items-center md:items-start'>
            <div className='flex flex-col gap-5 w-full'>
                {dayClasses.length === 0 ? (
                    <div className="flex items-center gap-1 justify-center w-full border border-[#E3E3E3] rounded-[10px] py-10">
                        <No />
                        <p className="text-label text-sm md:text-xl font-semibold">No scheduled classes</p>
                    </div>
                ) : (
                    dayClasses.map((c) => (
                    <div className='w-full flex flex-col items-center' key={c.name}>
                        {c.startTime === "14:00" && (
                        <div className="flex w-full h-fit max-w-120 text-[#FE620194] text-xs md:text-sm font-medium items-center gap-2 mb-5 md:mb-6">
                            <Polygon1 className='w-full h-full' />
                            <p className="text-nowrap">Lunch Break ({LUNCH_START} - {LUNCH_END})</p>
                            <Polygon2 className='w-full h-full' />
                        </div>
                        )}
                        <TimetableCard {...c} isNext={c.name === nextClass?.name} />
                    </div>
                    ))
                )}
            </div>
            {dayClasses.length >= 1 && 
                <ClassPlaceholder building={nextClass?.building} room={nextClass?.room}/>
            }
        </div>
        
    </div>
  )
}