

export default function PageHeading({ title, description }){

    return(
        <div className="flex flex-col gap-1 lg:gap-1.5">
            <h2 className="text-xl lg:text-[30px] font-semibold text-black">{title}</h2>
            <p className="text-label font-medium text-sm lg:text-xl">{description}</p>
        </div>
    )
}