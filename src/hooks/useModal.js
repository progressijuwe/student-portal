import { useCallback, useEffect, useRef, useState } from 'react';

export function useModal() {
	const [modal, setModal] = useState({ type: null, data: null });
	const timerRef = useRef(null);

	const clearTimer = useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	const open = useCallback(
		(type, data = null) => {
			clearTimer();
			setModal({ type, data });
		},
		[clearTimer],
	);

	const close = useCallback(() => {
		clearTimer();
		setModal({ type: null, data: null });
	}, [clearTimer]);

	/**
	 * Opens a confirmation that dismisses itself.
	 *
	 * Every admin page previously wrote this as `open(type); setTimeout(close,
	 * 2000)`, with nothing cancelling the timer. Opening another modal inside
	 * that window — clicking Edit on the row you just created, say — left the
	 * pending `close` to fire and blank the new dialog underneath the user.
	 *
	 * Two things prevent that here: opening or closing anything clears the
	 * outstanding timer, and the timer itself only acts if the confirmation it
	 * was scheduled for is still the one on screen.
	 */
	const openBriefly = useCallback(
		(type, ms = 2000) => {
			clearTimer();
			setModal({ type, data: null });

			timerRef.current = setTimeout(() => {
				timerRef.current = null;
				setModal((current) =>
					current.type === type
						? { type: null, data: null }
						: current,
				);
			}, ms);
		},
		[clearTimer],
	);

	// A page can unmount while a confirmation is still counting down.
	useEffect(() => clearTimer, [clearTimer]);

	return {
		modal,
		open,
		close,
		openBriefly,
	};
}
