import Avatar from "../../../../components/ui/Avatar"

export default function ProfileHeader({ student }) {
    return (
        <div className="flex gap-4 items-center px-4 pb-2 border-b border-border">
            <Avatar
                src={student.profilePhoto}
                alt={`${student.name}'s Profile Photo`}
                name={student.name}
                size="lg"
            />

            <div className="flex flex-col gap-2">
                <div>
                    <p className="font-semibold text-base">{student.name}</p>
                    <span className="text-xs font-semibold text-brand-orange">
                        {student.id}
                    </span>
                </div>

                <div className="flex gap-2">
                    <span className="bg-brand-blue border border-brand-blue-border text-brand-blue-border px-2.5 py-0.5 font-medium text-xs rounded-[5px]">{student.level} level</span>
                    <span className="bg-brand-blue border border-brand-blue-border text-brand-blue-border px-2.5 py-0.5 font-medium text-xs rounded-[5px]">{student.department}</span>
                </div>
            </div>
        </div>
    )
}