import LecturerAssigned from "../../sections/lecturer/dashboard/LecturerAssigned"
import LecturerStatCards from "../../sections/lecturer/dashboard/LecturerStatCards"


export default function LecturerDashboardPage(){
    const user = "Dr. Oliver Bassey"

    return(
        <div className="px-5 md:px-8 py-11 md:py-4 flex flex-col gap-7">
            <div className="flex flex-col gap-6">
                <h2 className="text-xl md:text-[30px] text-black font-semibold">Welcome Back, {user}.</h2>
                <LecturerStatCards />
            </div>
            <LecturerAssigned />
        </div>
    )
}