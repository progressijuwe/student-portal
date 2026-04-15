import { useState } from "react"
import Modal from "../../../../components/ui/Modal"
import { Button } from "../../../../components/ui/Button"

export default function FilterModal({ onClose, onApply, initialFilters = {} }) {
    const [filters, setFilters] = useState({
        faculty: initialFilters.faculty || "",
        department: initialFilters.department || "",
        level: initialFilters.level || "",
        date: initialFilters.date || "",
    })

    const handleChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleReset = () => {
        const empty = { faculty: "", department: "", level: "", date: "" }
        setFilters(empty)
        onApply(empty)
        onClose()
    }

    const handleApply = () => {
        onApply(filters)
        onClose()
    }

    const isEmpty = !filters.faculty && !filters.department && !filters.level && !filters.date

    return (
        <Modal heading="Filter Students" onClose={onClose}>
            <div className="flex flex-col gap-6 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Field
                        label="Faculty"
                        id="filter-faculty"
                        value={filters.faculty}
                        onChange={(val) => handleChange("faculty", val)}
                        options={[
                            { label: "All faculties", value: "" },
                            { label: "School of Computing", value: "School of Computing" },
                            { label: "School of Engineering", value: "School of Engineering" },
                            { label: "School of Management", value: "School of Management" },
                        ]}
                    />

                    <Field
                        label="Department"
                        id="filter-department"
                        value={filters.department}
                        onChange={(val) => handleChange("department", val)}
                        options={[
                        { label: "All departments", value: "" },
                        { label: "Software Engineering", value: "Software Engineering" },
                        { label: "Computer Science", value: "Computer Science" }
                        ]}
                    />

                    <Field
                        label="Level"
                        id="filter-level"
                        value={filters.level}
                        onChange={(val) => handleChange("level", val)}
                        options={[
                        { label: "All levels", value: "" },
                        { label: "100", value: "100" },
                        { label: "200", value: "200" },
                        { label: "300", value: "300" },
                        { label: "400", value: "400" }
                        ]}
                    />

                    <Field
                        label="Date"
                        id="filter-date"
                        value={filters.date}
                        onChange={(val) => handleChange("date", val)}
                        options={[
                            { label: "All dates", value: "" },
                            { label: "Last 7 days", value: "7" },
                            { label: "Last 30 days", value: "30" }
                        ]}
                    />
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-4 pt-2">
                    <Button
                        type="button"
                        variant="tertiary"
                        onClick={handleReset}
                    >
                        Reset Filters
                    </Button>

                    <div className="flex gap-3 justify-end">
                        <Button
                            type="button"
                            variant="tertiary"
                            onClick={onClose}
                        >
                        Cancel
                        </Button>

                        <Button
                            type="button"
                            variant="primary"
                            disabled={isEmpty}
                            onClick={handleApply}
                        >
                        Apply Filters
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

function Field({ label, id, value, onChange, options }) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-sm font-medium text-black">
                {label}
            </label>

            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="
                border border-border rounded-lg
                px-4 py-3 text-sm
                focus:outline-none focus:border-brand-orange
                "
            >
                {options.map(opt => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
                ))}
            </select>
        </div>
    )
}