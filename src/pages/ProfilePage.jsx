import PageHeading from "../components/ui/PageHeading";
import ProfileCard from "../sections/profile/ProfileCard";
import ProfileDownloads from "../sections/profile/ProfileDownloads";
import ProfileInfo from "../sections/profile/ProfileInfo";


export default function ProfilePage(){

    return(
        <div className=" px-4 lg:px-6 py-5 w-full flex flex-col gap-7.5 lg:gap-10">
            <section className='flex flex-col gap-5'>
                <PageHeading title="Profile Details" description="Manage your basic account details and personal information" />
                <ProfileCard />
            </section>
            <section className="flex flex-col lg:flex-row gap-6">
                <ProfileInfo />
                <ProfileDownloads />
            </section>
        </div>
    )
}