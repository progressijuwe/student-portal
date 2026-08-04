import { useState } from 'react';
import ActionBar from '../../../../components/ui/ActionBar';
import { Button } from '../../../../components/ui/Button';

export default function ProfileActions({
	onEdit,
	onDelete,
	onResetPassword,
	resetRequested,
}) {
	const [isResetting, setIsResetting] = useState(false);

	const handleReset = async () => {
		setIsResetting(true);
		try {
			await onResetPassword();
		} finally {
			setIsResetting(false);
		}
	};

	return (
		<ActionBar>
			{onResetPassword && (
				<Button
					// Emphasised when the user actually asked for it, so the
					// action the admin came here to perform is the obvious one.
					variant={resetRequested ? 'primary' : 'secondary'}
					onClick={handleReset}
					disabled={isResetting}
				>
					{isResetting ? 'Resetting…' : 'Reset password'}
				</Button>
			)}

			<Button variant='edit' onClick={onEdit}>
				Edit
			</Button>

			<Button variant='delete' onClick={onDelete}>
				Delete
			</Button>
		</ActionBar>
	);
}
