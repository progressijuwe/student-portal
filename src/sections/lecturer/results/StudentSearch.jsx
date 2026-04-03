
import Search from '../../../assets/svg/search.svg?react'
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"

export default function StudentSearch({ onSearch }){
    const [searchParams] = useSearchParams()

    const [value, setValue] = useState(() => searchParams.get("q") || "")

    useEffect(() => {
        setValue(searchParams.get("q") || "")
    }, [searchParams])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearch(value)
        }, 400)

        return () => clearTimeout(timeout)
    }, [value, onSearch])

    return(
        <div className="p-6 bg-white rounded-[10px] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
            <span className="relative flex items-center gap-2 p-2 rounded-[10px] border border-[#D1D5DC]">
                <Search className='size-5' />
                <label htmlFor="student-search" className="sr-only">
                    Search students by name or matric number
                </label>
                <input 
                    id="student-search"
                    type="search" 
                    value={value}
                    placeholder="Search by name or matric number..." 
                    className="lg:placeholder:text-base text-sm placeholder:text-sm placeholder:text-[#0A0A0A80] w-full"
                    onChange={(e) => setValue(e.target.value)}
                />
            </span>
        </div>
    )
}