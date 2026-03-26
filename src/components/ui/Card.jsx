import DonutChart from "./DonutChart"

export default function Card ({ label, icon, value, suffix, percent, footer }){

    return(
        <div className="flex flex-col gap-2 shrink justify-between border border-brand-orange rounded-[20px] bg-white py-4 md:py-5 md:px-4 px-2 w-full">
            <div className="flex justify-between">
                <h2 className="text-sm font-medium text-black">{label}</h2>
                <span className="[&>svg]:w-4 [&>svg]:h-4 lg:[&>svg]:w-6 lg:[&>svg]:h-6">{icon}</span>
                
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center md:items-end gap-5">
                    <div className="flex items-end">
                        <span className="text-[30px] md:text-[40px] text-brand-red font-medium leading-8 md:leading-10">{value}</span>
                        {suffix && <span className="text-label text-base md:text-[15px] font-medium">{suffix}</span>}
                    </div>
                    {percent && (
                        <div className="shrink-0 aspect-square">
                            <DonutChart percent={percent} size={44} />
                        </div>
                    )}
                </div>
                {footer}
            </div>
        </div>
    )
}