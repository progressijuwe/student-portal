import Avatar from "../../../../components/ui/Avatar"

export default function ProfileHeader({ user }) {

    if(!user) return null
    return (
        <div className="flex gap-4 items-center px-4 pb-2 border-b border-border">
            <Avatar
                src={user.profilePhoto}
                alt={`${user.name}'s Profile Photo`}
                name={user.name}
                size="lg"
            />

            <div className="flex flex-col gap-2">
                <div>
                    <p className="font-semibold text-base">{user.name}</p>
                    <span className="text-xs font-semibold text-brand-orange">
                        {user.id}
                    </span>
                </div>

                <div className="flex gap-2">
                    {user.level ? (
                        <span className="bg-brand-blue border border-brand-blue-border text-brand-blue-border px-2.5 py-0.5 font-medium text-xs rounded-[5px]">
                            {user.level} level
                        </span>
                    ) : (
                        <span className="bg-brand-blue border border-brand-blue-border text-brand-blue-border px-2.5 py-0.5 font-medium text-xs rounded-[5px]">
                            {user.courses?.length || 0} courses
                        </span>
                    )}
                    <span className="bg-brand-blue border border-brand-blue-border text-brand-blue-border px-2.5 py-0.5 font-medium text-xs rounded-[5px]">{user.department}</span>
                </div>
            </div>
        </div>
    )
}