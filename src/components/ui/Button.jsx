
export function Button({ children, variant = 'primary', ...props }) {
    const base = 'flex items-center gap-1 px-4 py-2 rounded-[10px] text-sm md:text-base leading-6 border border-[#940002] w-fit h-fit'
    const variants = {
      primary:   'bg-[#940002] text-white',
      secondary: 'bg-transparent text-[#940002]',
    }

    return (
      <button type="button" className={`${base} ${variants[variant]}`} {...props}>
        {children}
      </button>
    )
}