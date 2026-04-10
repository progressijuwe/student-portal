import { Form } from "react-router-dom"
import Modal from "../../components/ui/Modal"
import Person from "../../assets/svg/person.svg?react"
import Camera from "../../assets/svg/camera2.svg?react"
import { Button } from '../../components/ui/Button'

export default function AddStudentModal({ onClose }) {

    const formFields = [
        { label: "Full Name", type: "text", name: "name", placeholder: "Enter full name", id: "add-student-name" },
        { label: "Phone Number", type: "tel", name: "phone", placeholder: "+234 - XXX - XXXX - XXX", id: "add-student-phone" },
        { label: "Email Address", type: "email", name: "email", placeholder: "Enter email address", id: "add-student-email" },
        { label: "Address", type: "text", name: "address", placeholder: "Enter house address", id: "add-student-address" },
        { label: "Level", type: "select", name: "level", id: "add-student-level", options: ["100", "200", "300", "400"] },
        { label: "Faculty", type: "select", name: "faculty", id: "add-student-faculty", options: ["School of Computing"] },
        { label: "Department", type: "select", name: "department", id: "add-student-department", options: ["Software Engineering"] },
        { label: "Emergency Contact Name", type: "text", name: "emergencyName", placeholder: "Enter full name", id: "add-student-emergency-name" },
        { label: "Emergency Contact Number", type: "tel", name: "emergencyPhone", placeholder: "+234 - XXX - XXXX - XXX", id: "add-student-emergency-number" },
    ]

    return (
        <Modal onClose={onClose}>
            
            <div className="px-4 border-b border-border pb-3 w-full">
                <h2 className="text-label text-[24px] lg:text-[30px] font-semibold">
                    Fill in student details
                </h2>
            </div>

            <Form 
                method="post"
                className="flex flex-col justify-center items-center py-4 px-4 gap-6"
            >
                <div className="flex flex-col items-center gap-1">
                    <label htmlFor="add-student-photo" className="relative cursor-pointer bg-[#F9F9FF] border border-border w-fit rounded-full p-2 flex justify-center">
                        <Person className='[&_path]:fill-transparent [&_path]:stroke-label size-16 stroke-2' />
                        
                        <span className="p-1 bg-brand-red rounded-[5px] absolute bottom-0 right-0 cursor-pointer">
                            <Camera className='size-3' />
                            <input type="file" id="add-student-photo" name="profilePhoto" className="hidden" />
                        </span>
                    </label>
                    <p className="font-semibold text-sm text-label">
                        Upload student photo
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-5 max-w-170 w-full">
                    
                    {formFields.map((field) => (
                        <div key={field.id} className="flex flex-col gap-2">
                            
                            <label htmlFor={field.id} className="text-sm font-medium">
                                {field.label}
                            </label>

                            {field.type === "select" ? (
                                <select
                                    id={field.id}
                                    name={field.name}
                                    className="border border-border focus:border-brand-orange rounded-[5px] text-sm placeholder:text-sm px-5 py-3"
                                >
                                    <option value="">Select</option>
                                    {field.options?.map((opt) => (
                                        <option key={opt} value={opt} className="text-sm placeholder:text-sm px-5 py-3">
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    id={field.id}
                                    name={field.name}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className="border border-border focus:border-brand-orange rounded-[5px] text-sm placeholder:text-sm px-5 py-3"
                                />
                            )}

                        </div>
                    ))}

                </div>

                <div className="flex gap-4 justify-end w-full px-0 lg:px-8">
                    
                    <Button 
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button 
                        type="submit"
                        variant='primary'
                    >
                        Add Student
                    </Button>

                </div>

            </Form>
        </Modal>
    )
}