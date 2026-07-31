import { useCallback, useEffect, useId, useRef } from 'react';
import { motion } from 'framer-motion';
import Close from '../../assets/svg/close.svg?react';

const FOCUSABLE =
	'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Modal({
	Icon,
	heading,
	description,
	children,
	onClose,
}) {
	const dialogRef = useRef(null);
	const previouslyFocused = useRef(null);
	const headingId = useId();
	const descriptionId = useId();

	// Move focus into the dialog on open and return it on close. Without this a
	// keyboard user is left at the top of the page behind the overlay.
	useEffect(() => {
		previouslyFocused.current = document.activeElement;

		const firstFocusable =
			dialogRef.current?.querySelector(FOCUSABLE) ?? dialogRef.current;
		firstFocusable?.focus();

		return () => previouslyFocused.current?.focus?.();
	}, []);

	// The page behind a modal must not scroll.
	useEffect(() => {
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, []);

	const handleKeyDown = useCallback(
		(event) => {
			if (event.key === 'Escape') {
				onClose();
				return;
			}

			if (event.key !== 'Tab') return;

			// Trap Tab inside the dialog so focus cannot wander onto the page
			// underneath, which a screen reader still announces.
			const focusable = Array.from(
				dialogRef.current?.querySelectorAll(FOCUSABLE) ?? [],
			);

			if (focusable.length === 0) return;

			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		},
		[onClose],
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	return (
		<motion.div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
			onClick={onClose}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<motion.div
				ref={dialogRef}
				role='dialog'
				aria-modal='true'
				// Generated ids, so the labelling actually resolves. The previous
				// version pointed aria-labelledby at "modal-heading" while the
				// heading rendered with id "modal-heading-<slug>" — the reference
				// dangled and the dialog was announced unnamed.
				aria-labelledby={heading ? headingId : undefined}
				aria-describedby={description ? descriptionId : undefined}
				tabIndex={-1}
				className='flex max-h-130 w-full max-w-196 flex-col gap-3 overflow-y-auto rounded-[10px] bg-white p-4'
				onClick={(event) => event.stopPropagation()}
				initial={{ scale: 0.85, opacity: 0, y: 20 }}
				animate={{ scale: 1, opacity: 1, y: 0 }}
				exit={{ scale: 0.9, opacity: 0, y: 10 }}
				transition={{ type: 'spring', stiffness: 300, damping: 25 }}
			>
				<div
					className={`flex w-full items-center gap-1 border-border px-4 lg:gap-2 ${
						heading
							? 'justify-between border-b pb-3'
							: 'justify-end'
					}`}
				>
					<div className='flex flex-col gap-1'>
						{heading && (
							<div className='flex items-center gap-1 lg:gap-2'>
								{Icon && (
									<span
										aria-hidden='true'
										className='rounded-full bg-[#FFEFEF] p-2'
									>
										{Icon}
									</span>
								)}
								<h2
									id={headingId}
									className='text-xl font-semibold lg:text-[30px]'
								>
									{heading}
								</h2>
							</div>
						)}

						{description && (
							<p
								id={descriptionId}
								className='text-sm font-medium leading-4.25 text-label'
							>
								{description}
							</p>
						)}
					</div>

					<button
						type='button'
						onClick={onClose}
						aria-label='Close dialog'
						className='rounded-[5px] bg-transparent p-1 hover:bg-[#D9D9D9] focus-visible:outline-2 focus-visible:outline-brand-border'
					>
						<Close
							aria-hidden='true'
							className='size-6 lg:size-10'
						/>
					</button>
				</div>

				<div>{children}</div>
			</motion.div>
		</motion.div>
	);
}
