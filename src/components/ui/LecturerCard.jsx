export default function LecturerCard({ label, icon, bgColor, color, value }) {
  return (
    <div className="w-full flex flex-col justify-between gap-1 border border-brand-orange rounded-[10px] bg-white py-5 px-4">
      <div className="flex justify-between items-center gap-2">
        <p className="text-xs lg:text-sm text-black">{label}</p>
        <span
          style={{ backgroundColor: bgColor }}
          className="p-1 rounded-[5px] [&>svg]:w-4 [&>svg]:h-4 lg:[&>svg]:w-6 lg:[&>svg]:h-6"
        >
          <style>{`
            .icon-${color.replace('#', '')} path { stroke: ${color} !important; }
          `}</style>
          <span className={`icon-${color.replace('#', '')}`}>
            {icon}
          </span>
        </span>
      </div>
      <span className="text-[30px] lg:text-[40px] text-brand-red font-medium">{value}</span>
    </div>
  )
}