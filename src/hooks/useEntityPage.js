import { useState, useMemo, useEffect, useCallback } from "react"
import { useModal } from "./useModal"

const MODAL = {
    ADD:            "add",
    SUCCESS:        "success",
    FILTER:         "filter",
    VIEW:           "view",
    DELETE:         "delete",
    DELETE_SUCCESS: "delete-success",
    EDIT:           "edit",
    EDIT_SUCCESS:   "edit-success",
}
export function useEntityPage({ data, filterFn, useQueryHook, perPage = 8 }) {
    const { search, page, filters, setSearch, setFilters, setPage } = useQueryHook()
    const { modal, open, close } = useModal()

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [debouncedSearch, setDebouncedSearch] = useState("")

    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search), 300)
        return () => clearTimeout(t)
    }, [search])

    useEffect(() => {
        setPage(1)
    }, [
        debouncedSearch,
        filters.faculty,
        filters.department,
        filters.level,
        filters.enrollmentYear,
    ])

    const fetchItems = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
        await new Promise(res => setTimeout(res, 1000)) // replace with API call
            setItems(data)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }, [data])

    useEffect(() => {
        fetchItems()
    }, [fetchItems])

    const filteredItems = useMemo(
        () => filterFn(items, debouncedSearch, filters),
        [items, debouncedSearch, filters, filterFn]
    )

    const totalPages = useMemo(
        () => Math.ceil(filteredItems.length / perPage),
        [filteredItems.length, perPage]
    )

    const safePage = page > totalPages ? 1 : page

    const paginatedItems = useMemo(() => {
        const start = (safePage - 1) * perPage
        return filteredItems.slice(start, start + perPage)
    }, [filteredItems, safePage, perPage])

    const handleView   = useCallback((item) => open(MODAL.VIEW,   item), [open])
    const handleEdit   = useCallback((item) => open(MODAL.EDIT,   item), [open])
    const handleDelete = useCallback((item) => open(MODAL.DELETE, item), [open])

    const handleSuccess = useCallback((type) => {
        open(type)
        setTimeout(close, 2000)
    }, [open, close])

    return {
        search, filters, page, setSearch, setFilters, setPage,
        items: paginatedItems,
        filteredItems,
        totalPages,
        loading, error,
        modal, open, close,
        fetchItems,
        handleView, handleEdit, handleDelete, handleSuccess,
    }
}