import Download from '../../../assets/svg/download-icon.svg?react'
import Transcript from '../../../assets/svg/transcript-icon.svg?react'
import { Button } from '../../../components/ui/Button'
import ActionBar from '../../../components/ui/ActionBar'

export default function StudentResultsActions() {

    return (
        <ActionBar>
            <Button variant="secondary">
                <Transcript />
                View Transcript
            </Button>

            <Button>
                <Download />
                Download Result
            </Button>
        </ActionBar>
    )
}