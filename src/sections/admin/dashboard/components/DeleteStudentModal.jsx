import { defs } from "framer-motion/client";
import { useState } from "react";
import Modal from "../../../../components/ui/Modal";
import Warning from '../../../../assets/svg/warningIcon.svg?react'
import { Button } from "../../../../components/ui/Button";

export default function DeleteStudentModal({ onClose, onSuccess }){
    const [submitting, setSubmitting] = useState(false)
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setSubmitting(true)

            // fake API
            await new Promise(res => setTimeout(res, 1000))

            onClose()
            onSuccess()

        } catch (err) {
            console.error(err)
        } finally {
            setSubmitting(false)
        }
    }

    return(
        <Modal onClose={onClose} Icon={<Warning />} heading="Delete Student">
            <form 
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-5 items-center max-w-140 mx-auto">
                <div className="flex flex-col gap-6 w-full items-center">
                    <p className="font-medium text-label text-xs lg:text-sm">Are you sure you want to delete this student? This will remove all their records, course registrations, and academic history</p>
                    <span className="bg-[#FFEFEF] pl-5 pr-1.5 border-l-5 border-[#FF0000] py-2.5 font-medium text-xs lg:text-sm text-[#FF0000]"><span className="font-semibold">Warning: </span>This action cannot be undone. All associated data will be permanently removed from the system.</span>
                </div>
                <div className="w-full flex justify-end gap-4">
                    <Button 
                        type="button"
                        variant="tertiary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={submitting}
                        variant="delete"    
                    >
                        Delete Permanently
                    </Button>
                </div>
            </form>
        </Modal>
    )
}