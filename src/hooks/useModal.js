import { useState, useCallback } from 'react';

export function useModal() {
	const [modal, setModal] = useState({ type: null, data: null });

	const open = useCallback((type, data = null) => {
		setModal({ type, data });
	}, []);

	const close = useCallback(() => {
		setModal({ type: null, data: null });
	}, []);

	return {
		modal,
		open,
		close,
	};
}
