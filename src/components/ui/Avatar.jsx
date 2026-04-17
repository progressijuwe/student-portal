import { useState } from 'react'
import { getInitials } from '../../utils/getInitials'

export default function Avatar({ src, name, size = "md" }) {
    const [error, setError] = useState(false)
    
    const sizes = {
        sm: "size-6 text-[10px]",
        md: "size-12 text-sm",
        lg: "size-20 lg:size-24 text-lg",
    }

    return (
        <div className={`rounded-full bg-brand-blue flex items-center justify-center overflow-hidden ${sizes[size]}`}>
            {src && !error ? (
                <img 
                    src={src} 
                    alt={name}
                    className="w-full h-full object-cover border-2 border-brand-orange rounded-full"
                />
            ) : (
                <span className="text-white flex items-center justify-center text-center font-black w-full h-full bg-brand-red rounded-full">
                    {getInitials(name)}
                </span>
            )}
        </div>
    )
}