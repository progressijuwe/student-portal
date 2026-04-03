import Download from '../../../assets/svg/download-icon.svg?react'
import Transcript from '../../../assets/svg/transcript-icon.svg?react'
import { Button } from '../../../components/ui/Button'

export default function ResultsButtons({ className }){

    return(
        <div className={`flex justify-between gap-5 ${className}`}>
            <Button variant='secondary'>
                <Transcript />
                View Transcript
            </Button>
            <Button>
                <Download />
                Download Result
            </Button>
        </div>
    )
}