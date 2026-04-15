import { motion } from "framer-motion"
import Close from '../../assets/svg/close.svg?react'

export default function Modal({ Icon, heading, children, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}

      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-heading"
        aria-describedby="modal-content"

        className="bg-white rounded-[10px] p-4 max-w-196 max-h-130 w-full flex flex-col gap-3 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}

        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 10 }}

        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25
        }}
      >
        <div
          className={`flex items-center gap-1 lg:gap-2 px-4 border-border w-full ${
            heading ? "justify-between border-b pb-3" : "justify-end"
          }`}
        >
          {heading && (
            <div className="flex gap-1 lg:gap-2 items-center">
              {Icon && <span className="bg-[#FFEFEF] p-2 rounded-full ">{Icon}</span>}
              <h2 
                id={`modal-heading-${heading?.replace(/\s+/g, '-').toLowerCase()}`}
                className="text-xl lg:text-[30px] font-semibold">
                {heading}
              </h2>
            </div>
          )}

          <button 
            onClick={onClose}
            className="bg-transparent p-1 rounded-[5px] hover:bg-[#D9D9D9]"
          >
            <Close className='size-6 lg:size-10' />
          </button>
        </div>
        
        <div id="modal-content">{children}</div>
      </motion.div>
    </motion.div>
  )
}