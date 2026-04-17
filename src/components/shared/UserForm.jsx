import { useState, useEffect } from "react"
import Person from "../../assets/svg/person.svg?react"
import Camera from "../../assets/svg/camera2.svg?react"
import { Button } from "../ui/Button"

export const studentFields = [
    {
        label: "Full Name",
        type: "text",
        name: "name",
        placeholder: "Enter full name",
        id: "student-name",
        required: true
    },
    {
        label: "Phone Number",
        type: "tel",
        name: "phone",
        placeholder: "+234 - XXX - XXXX - XXX",
        id: "student-phone",
        required: true,
        validate: (value) =>
            !/^\+?\d{7,15}$/.test(value.replace(/\s/g, ""))
                ? "Invalid phone number"
                : null
    },
    {
        label: "Email Address",
        type: "email",
        name: "email",
        placeholder: "Enter email address",
        id: "student-email",
        required: true,
        validate: (value) =>
            !/\S+@\S+\.\S+/.test(value)
                ? "Invalid email format"
                : null
    },
    {
        label: "Address",
        type: "text",
        name: "address",
        placeholder: "Enter house address",
        id: "student-address",
        required: true
    },
    {
        label: "Level",
        type: "select",
        name: "level",
        id: "student-level",
        options: ["100", "200", "300", "400"],
        required: true
    },
    {
        label: "Faculty",
        type: "select",
        name: "faculty",
        id: "student-faculty",
        options: ["School of Computing"],
        required: true
    },
    {
        label: "Department",
        type: "select",
        name: "department",
        id: "student-department",
        dependsOn: "faculty",
        required: true
    },
    {
        label: "Emergency Contact Name",
        type: "text",
        name: "emergencyName",
        id: "student-emergency-name",
        required: true
    },
    {
        label: "Emergency Contact Number",
        type: "tel",
        name: "emergencyPhone",
        id: "student-emergency-number",
        required: true
    },
]

export const lecturerFields = [
    {
        label: "Prefix",
        type: "select",
        name: "prefix",
        id: "lecturer-prefix",
        options: ["Mr", "Mrs", "Dr", "Prof"],
        required: true
    },
    {
        label: "Full Name",
        type: "text",
        name: "name",
        placeholder: "Enter full name",
        id: "lecturer-name",
        required: true
    },
    {
        label: "Email Address",
        type: "email",
        name: "email",
        placeholder: "Enter email address",
        id: "lecturer-email",
        required: true,
        validate: (value) =>
            !/\S+@\S+\.\S+/.test(value)
                ? "Invalid email format"
                : null
    },
    {
        label: "Phone Number",
        type: "tel",
        name: "phone",
        placeholder: "+234 - XXX - XXXX - XXX",
        id: "lecturer-phone",
        required: true,
        validate: (value) =>
            !/^\+?\d{7,15}$/.test(value.replace(/\s/g, ""))
                ? "Invalid phone number"
                : null
    },
    {
        label: "Faculty",
        type: "select",
        name: "faculty",
        id: "lecturer-faculty",
        options: ["School of Computing"],
        required: true
    },
    {
        label: "Department",
        type: "select",
        name: "department",
        id: "lecturer-department",
        dependsOn: "faculty",
        required: true
    },
    {
        label: "Highest Qualification",
        type: "select",
        name: "qualification",
        id: "lecturer-qualification",
        required: true,
        options: [
            "Diploma",
            "HND",
            "BSc",
            "BEng",
            "MSc",
            "MEng",
            "PhD",
            "Other"
        ]
    },
    {
        label: "Emergency Contact Name",
        type: "text",
        name: "emergencyName",
        placeholder: "Enter full name",
        id: "lecturer-emergency-name",
        required: true
    },
    {
        label: "Emergency Contact Number",
        type: "tel",
        name: "emergencyPhone",
        placeholder: "+234 - XXX - XXXX - XXX",
        id: "lecturer-emergency-phone",
        required: true,
        validate: (value) =>
            !/^\+?\d{7,15}$/.test(value.replace(/\s/g, ""))
                ? "Invalid phone number"
                : null
    }
]

const facultyDepartments = {
    "School of Computing": [
        "Software Engineering",
        "Computer Science",
        "Cyber Security",
        "Information Systems"
    ],
    "School of Engineering": [
        "Mechanical Engineering",
        "Electrical Engineering",
        "Civil Engineering"
    ]
}

export default function UserForm({ fields, initialData, onSubmit, onCancel, submitLabel = "Save" }) {
    const [preview, setPreview] = useState(null)
    const [values, setValues] = useState({})
    const [touched, setTouched] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const data = initialData || {}

        const initialValues = {}

        fields.forEach(field => {
            initialValues[field.name] = data[field.name] || ""
        })

        setValues(initialValues)
        setPreview(data.profilePhoto || null)
    }, [initialData, fields])

    const [submitting, setSubmitting] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target

        setValues(prev => {
            const updated = { ...prev, [name]: value }

            // reset department if faculty changes
            if (name === "faculty") {
                updated.department = ""
            }

            return updated
        })

        const field = fields.find(f => f.name === name)
        const error = validateField(field, value)

        setErrors(prev => {
            const updated = { ...prev }

            if (error) {
                updated[name] = error
            } else {
                delete updated[name]
            }

            return updated
        })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const imageUrl = URL.createObjectURL(file)
        setPreview(imageUrl)

        setValues(prev => ({ ...prev, profilePhoto: file }))
    }

    const validateField = (field, value) => {
        // Required check
        if (field.required && !value) {
            return `${field.label} is required`
        }

        // Custom validation
        if (field.validate && value) {
            return field.validate(value)
        }

        return null
    }
    const validate = () => {
        const newErrors = {}

        fields.forEach(field => {
            const value = values[field.name]
            const error = validateField(field, value)

            if (error) newErrors[field.name] = error
        })

        return newErrors
    }
    const handleBlur = (e) => {
        const { name, value } = e.target

        const field = fields.find(f => f.name === name)
        if (!field) return

        const error = validateField(field, value)

        setTouched(prev => ({ ...prev, [name]: true }))

        setErrors(prev => {
            const updated = { ...prev }

            if (error) {
                updated[name] = error
            } else {
                delete updated[name]
            }

            return updated
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationErrors = validate()

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)

            const allTouched = {}

            fields.forEach(field => {
                allTouched[field.name] = true
            })
            setTouched(allTouched)

            return
        }
        try {
            setSubmitting(true)
            await onSubmit(values)
        } catch (err) {
            console.error(err)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center py-4 px-4 gap-6"
        >
            <div className="flex flex-col items-center gap-1">
                <label htmlFor="student-photo" className="relative cursor-pointer bg-[#F9F9FF] border border-border w-fit rounded-full p-2 flex justify-center">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Student"
                            className="size-16 rounded-full object-cover"
                        />
                    ) : (
                        <Person className='[&_path]:fill-transparent [&_path]:stroke-label size-16 stroke-2' />
                    )}
                    <span className="p-1 bg-brand-red rounded-[5px] absolute bottom-0 right-0 cursor-pointer">
                        <Camera className='size-3' />
                        <input 
                            type="file" 
                            id="student-photo" 
                            name="profilePhoto" 
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </span>
                </label>
                <p className="font-semibold text-sm text-label">Upload profile photo</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-5 max-w-170 w-full">
                {fields.map((field) => (
                    <div key={field.id} className="flex flex-col gap-2">
                        <label htmlFor={field.id} className="text-sm font-medium">
                            {field.label}
                        </label>
                        {field.type === "select" ? (
                            <select
                                id={field.id}
                                name={field.name}
                                value={values[field.name]}
                                disabled={field.name === "department" && !values.faculty}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className={`border focus:border-brand-orange rounded-[5px] text-sm px-5 py-3 ${
                                    errors[field.name] ? "border-red-500" : "border-border"
                                }`}
                            >
                                <option value="">Select</option>
                                {(field.name === "department"
                                    ? facultyDepartments[values.faculty] || []
                                    : field.options || []
                                ).map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                value={values[field.name] || ""}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className={`border focus:border-brand-orange rounded-[5px] text-sm placeholder:text-sm px-5 py-3 ${
                                    errors[field.name] ? "border-red-500" : "border-border"
                                }`}

                            />
                        )}
                        {touched[field.name] && errors[field.name] && (
                            <p className="text-red-500 text-xs">{errors[field.name]}</p>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex gap-4 justify-end w-full px-0 lg:px-8">
                <Button type="button" variant="tertiary" onClick={onCancel} disabled={submitting}>
                    Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={submitting}>
                    {submitting ? "Saving..." : submitLabel}
                </Button>
            </div>
        </form>
    )
}