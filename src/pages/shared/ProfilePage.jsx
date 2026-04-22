import PageHeading from "../../components/ui/PageHeading";
import ProfileCard from "../../sections/shared/profile/ProfileCard";
import ProfileDownloads from "../../sections/shared/profile/ProfileDownloads";
import ProfileInfo from "../../sections/shared/profile/ProfileInfo";
import { useAuth } from "../../context/AuthContext"



export default function ProfilePage(){
    
    const { user, loading } = useAuth()

    if (loading) return <p>Loading...</p>

    return(
        <div className=" px-4 lg:px-6 py-5 w-full flex flex-col gap-7.5 lg:gap-10">
            <section className='flex flex-col gap-5'>
                <PageHeading title="Profile Details" description="Manage your basic account details and personal information" />
                <ProfileCard {...user} />
            </section>
            <section className="flex flex-col lg:flex-row gap-6">
                <ProfileInfo user={user} />
                <ProfileDownloads />
            </section>
        </div>
    )
}