import { useSearchParams } from "react-router-dom"
import { useCallback } from "react"

export function useLecturerQuery() {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get("q") || ""
    const page   = Number(searchParams.get("page")) || 1

    const filters = {
        faculty:    searchParams.get("faculty")    || "",
        department: searchParams.get("department") || "",
        title:      searchParams.get("title")      || "",
        qualification: searchParams.get("qualification") || "",
        courseLoad:    searchParams.get("courseLoad")    || "",
        joinYear:  searchParams.get("joinYear") || "",
    }

    const updateParams = useCallback((updates) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev)

            Object.entries(updates).forEach(([key, value]) => {
                if (value) next.set(key, value)
                else next.delete(key)
            })

            return next
        })
    }, [setSearchParams])

    return {
        search,
        page,
        filters,
        setSearch: (q) => updateParams({ q, page: null }),
        setFilters: (f) => updateParams({ ...f, page: null }),
        setPage: (p) => updateParams({ page: p }),
    }
}