import Map from '../../../assets/images/map.jpg'

export default function ClassPlaceholder({ building, room }){
    const navUrl = `https://www.maps.app.goo.gl/wQppLtdQF23ip8EXA?g_st=ic`
    const walkTime = '17 mins'

    return(
        <div className='flex flex-col w-full max-w-md border border-[#6161613B] rounded-[10px]'>
            <img src={Map} alt='Map image' className='h-70.5 md:h-92 w-full object-cover rounded-[10px]' />
            <div className="py-4 px-6 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                    <p className="text-xs text-label font-medium">Next Class Location</p>
                    <a
                        href={navUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-brand-orange font-semibold"
                    >
                        Nav Link
                    </a>
                </div>
                <span className="font-semibold text-xl text-black">
                    {building || "NMI Building"} | {room || "Lecture Hall 3"}
                </span>
                {walkTime && (
                    <p className="text-xs text-label font-medium">{walkTime} walk from your location</p>
                )}
            </div>
        </div>
    )
}