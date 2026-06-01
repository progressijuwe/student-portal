import { useStudentQuery } from "./useStudentQuery"

export function useStudentFilters() {
    const { search, page, filters, setSearch, setFilters, setPage } =
        useStudentQuery()

    return {
        search,
        page,
        setSearch,
        setFilters,
        setPage,

        searchQuery: search || "",
        filters
    }
}