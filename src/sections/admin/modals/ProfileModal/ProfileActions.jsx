import ActionBar from '../../../../components/ui/ActionBar';
import { Button } from '../../../../components/ui/Button';

export default function ProfileActions({ onEdit, onDelete }) {
	return (
		<ActionBar>
			<Button variant='edit' onClick={onEdit}>
				Edit
			</Button>

			<Button variant='delete' onClick={onDelete}>
				Delete
			</Button>
		</ActionBar>
	);
}
