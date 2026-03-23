import ProfileCard from "../sections/profile/ProfileCard";
import ProfileDownloads from "../sections/profile/ProfileDownloads";
import ProfileInfo from "../sections/profile/ProfileInfo";


export default function ProfilePage(){

    return(
        <div className=" px-4 lg:px-6 py-5 w-full flex flex-col gap-7.5 lg:gap-10">
            <section className='flex flex-col gap-5'>
                <div className="flex flex-col gap-1 lg:gap-1.5">
                    <h2 className="text-xl lg:text-[30px] font-semibold text-black">Profile Details</h2>
                    <p className="text-label font-medium text-sm lg:text-xl">Manage your basic account details and personal information</p>
                </div>
                <ProfileCard />
            </section>
            <section className="flex flex-col lg:flex-row gap-6">
                <ProfileInfo />
                <ProfileDownloads />
            </section>
        </div>
    )
}