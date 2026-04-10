export default function Modal({ children, onClose }) {
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        style={{ scrollbarWidth: "none" }}
        className="bg-white rounded-[10px] p-4 max-w-196 max-h-130 w-full flex flex-col gap-3 overflow-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}