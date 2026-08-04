import { useEffect, useId, useRef, useState } from 'react';
import Notifs from '../../assets/svg/notification-bell.svg?react';
import { timeAgo } from '../../utils/timeAgo';
import {
	useMarkAllNotificationsRead,
	useMarkNotificationRead,
	useNotifications,
} from '../../hooks/useNotifications';

/**
 * Colour by what the notification is telling you, not by its title text.
 *
 * `type` is set explicitly in each notification's `toDatabase()`, so this
 * cannot drift the way string matching on the message would.
 */
const TONE = {
	grade_approved: 'bg-green-500',
	grade_rejected: 'bg-brand-red',
	grade_submitted: 'bg-brand-orange',
	account_created: 'bg-brand-orange',
};

export default function NotificationBell() {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef(null);
	const panelId = useId();

	const { notifications, unreadCount, isPending, isError, isSupported } =
		useNotifications();
	const markRead = useMarkNotificationRead();
	const markAllRead = useMarkAllNotificationsRead();

	// Close on Escape, and on a click anywhere outside the bell and its panel.
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (event) => {
			if (event.key === 'Escape') setIsOpen(false);
		};

		const handlePointerDown = (event) => {
			if (!containerRef.current?.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('mousedown', handlePointerDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('mousedown', handlePointerDown);
		};
	}, [isOpen]);

	// Admins, students and lecturers all have an endpoint; anyone else has no
	// notifications to show, so the control is not rendered at all rather than
	// rendered permanently empty.
	if (!isSupported) return null;

	const handleItemClick = (notification) => {
		if (!notification.read_at) markRead.mutate(notification.id);
	};

	return (
		<div ref={containerRef} className='relative'>
			<button
				type='button'
				onClick={() => setIsOpen((open) => !open)}
				aria-label={
					unreadCount > 0
						? `Notifications, ${unreadCount} unread`
						: 'Notifications'
				}
				aria-expanded={isOpen}
				aria-controls={isOpen ? panelId : undefined}
				className='relative rounded-full p-1 focus-visible:outline-2 focus-visible:outline-brand-border'
			>
				<Notifs aria-hidden='true' className='h-6 w-6 fill-brand-red' />

				{unreadCount > 0 && (
					<span
						aria-hidden='true'
						className='absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white'
					>
						{unreadCount > 9 ? '9+' : unreadCount}
					</span>
				)}
			</button>

			{isOpen && (
				<div
					id={panelId}
					role='dialog'
					aria-label='Notifications'
					className='absolute right-0 top-full z-50 mt-2 flex max-h-96 w-80 flex-col overflow-hidden rounded-[10px] border border-border bg-white shadow-lg sm:w-96'
				>
					<div className='flex items-center justify-between border-b border-border px-4 py-3'>
						<h2 className='text-sm font-semibold text-black'>
							Notifications
						</h2>

						{unreadCount > 0 && (
							<button
								type='button'
								onClick={() => markAllRead.mutate()}
								disabled={markAllRead.isPending}
								className='text-xs font-semibold text-brand-orange disabled:opacity-50'
							>
								{markAllRead.isPending
									? 'Marking…'
									: 'Mark all read'}
							</button>
						)}
					</div>

					<div className='flex-1 overflow-y-auto'>
						{isPending ? (
							<p
								role='status'
								className='px-4 py-10 text-center text-sm text-label'
							>
								Loading…
							</p>
						) : isError ? (
							<p
								role='alert'
								className='px-4 py-10 text-center text-sm text-red-500'
							>
								Couldn't load notifications.
							</p>
						) : notifications.length === 0 ? (
							<p className='px-4 py-10 text-center text-sm text-label'>
								Nothing here yet. Grade releases and approvals
								will show up here.
							</p>
						) : (
							<ul>
								{notifications.map((notification) => {
									const isUnread = !notification.read_at;

									return (
										<li key={notification.id}>
											<button
												type='button'
												onClick={() =>
													handleItemClick(
														notification,
													)
												}
												className={`flex w-full gap-3 border-b border-border px-4 py-3 text-left last:border-0 hover:bg-[#F9F9FF] ${
													isUnread
														? 'bg-[#FFF7ED]'
														: ''
												}`}
											>
												<span
													aria-hidden='true'
													className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
														isUnread
															? (TONE[
																	notification
																		.data
																		?.type
																] ??
																'bg-brand-orange')
															: 'bg-transparent'
													}`}
												/>

												<span className='flex flex-col gap-0.5'>
													<span className='text-sm font-semibold text-black'>
														{notification.data
															?.title ??
															'Notification'}
													</span>
													<span className='text-xs text-label'>
														{
															notification.data
																?.message
														}
													</span>
													<span className='text-xs text-label'>
														{timeAgo(
															notification.created_at,
														)}
														{isUnread && (
															<span className='sr-only'>
																{' '}
																— unread
															</span>
														)}
													</span>
												</span>
											</button>
										</li>
									);
								})}
							</ul>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
