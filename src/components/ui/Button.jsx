
export function Button({ children, variant = 'primary', type='button', ...props }) {
    const base = 'flex items-center gap-1 px-4 py-2 rounded-[10px] text-sm md:text-base leading-6 border border-[#940002] w-fit h-fit text-nowrap'
    const variants = {
      primary:   'bg-brand-red border-brand-red text-white',
      secondary: 'bg-transparent border-brand-red text-[#940002]',
      tertiary:  'bg-transparent border-label text-label',
      edit:      'bg-label border-label text-white',
      delete:    'bg-[#FF0000] border-[#FF0000] text-white'
    }

    return (
      <button type={type} className={`${base} ${variants[variant]}`} {...props}>
        {children}
      </button>
    )
}