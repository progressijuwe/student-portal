import laptop from '../../../assets/images/laptop.png'
import bars from '../../../assets/images/bars.png'

const courses = [
    {
        courseName: "Software Constuction", 
        image: laptop
    },
    {
        courseName: "Object Oriented Analysis and Design",
        image: bars
    }
]

export default function Enrolled(){

    return(
        <section className="w-full lg:w-2/3 flex flex-col gap-4">
            <div className="flex justify-between">
                <h3 className="text-base font-medium">Enrolled Courses</h3>
                <button type="button" className="text-sm text-brand-red font-medium">See all</button>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                {
                    courses.map((course) => (
                        <div className='w-full flex justify-between border border-brand-border bg-brand px-4 py-3 rounded-[20px]' key={course.courseName}>
                            <div className='flex flex-col gap-2 justify-between items-start'>
                                <h4 className='text-sm font-medium'>{course.courseName}</h4>
                                <button type='button' className='px-2.5 py-1.25 bg-brand-red rounded-[10px] text-white text-xs'>View grade</button>
                            </div>
                            <img src={course.image} alt='Course Image' />
                        </div>
                    ))
                }
            </div>
        </section>
    )
}