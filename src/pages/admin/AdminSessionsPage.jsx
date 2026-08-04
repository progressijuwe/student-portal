import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import {
	useAdminSessions,
	useSetCurrentSession,
} from '../../hooks/admin/useAdminSessions';
import { useModal } from '../../hooks/useModal';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { Button } from '../../components/ui/Button';
import EntityPageShell from '../../components/ui/EntityPageShell';
import Pagination from '../../components/ui/Pagination';
import SessionTable from '../../sections/admin/sessions/SessionTable';
import SessionFormModal from '../../sections/admin/modals/SessionFormModal';
import SetCurrentSessionModal from '../../sections/admin/modals/SetCurrentSessionModal';
import AddSuccessModal from '../../sections/admin/modals/AddSuccessModal';

const MODAL = {
	FORM: 'form',
	SET_CURRENT: 'set-current',
	CREATED: 'created',
	UPDATED: 'updated',
	SWITCHED: 'switched',
};

/**
 * Academic sessions — the year everything else hangs off.
 *
 * Previously there was no way in at all: `is_current` and the semester dates
 * could only be changed with SQL, which made the annual rollover a database
 * operation rather than an administrative one.
 */
export default function AdminSessionsPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = Number(searchParams.get('page')) || 1;

	const { modal, open, close, openBriefly } = useModal();
	const setCurrent = useSetCurrentSession();

	const params = useMemo(() => ({ page }), [page]);
	const { data, isPending, isError, error, refetch } =
		useAdminSessions(params);

	const sessions = data?.data ?? [];
	const meta = data?.meta ?? {};
	const currentSession = sessions.find((session) => session.is_current);

	const setPage = (next) =>
		setSearchParams(
			(prev) => {
				const params = new URLSearchParams(prev);
				if (next > 1) params.set('page', String(next));
				else params.delete('page');
				return params;
			},
			{ replace: true },
		);

	const handleSuccess = (type) => openBriefly(type);

	const handleConfirmSetCurrent = async () => {
		await setCurrent.mutateAsync(modal.data.id);
		handleSuccess(MODAL.SWITCHED);
	};

	return (
		<EntityPageShell title='Academic Sessions'>
			<div className='flex flex-col gap-3 px-4 pt-4 lg:flex-row lg:items-center lg:justify-between'>
				<p className='text-sm text-label'>
					Courses, registration, results and timetables are all scoped
					to a session. Set next year up in advance, then switch when
					it begins.
				</p>
				<Button onClick={() => open(MODAL.FORM, null)}>
					Add Session
				</Button>
			</div>

			<SessionTable
				sessions={sessions}
				loading={isPending}
				error={isError ? getErrorMessage(error) : null}
				onRetry={refetch}
				onEdit={(session) => open(MODAL.FORM, session)}
				onSetCurrent={(session) => open(MODAL.SET_CURRENT, session)}
				settingCurrentId={
					setCurrent.isPending ? modal.data?.id : undefined
				}
				onAdd={() => open(MODAL.FORM, null)}
			/>

			{!isError && !isPending && meta.last_page > 1 && (
				<Pagination
					page={meta.current_page}
					total={meta.total}
					perPage={meta.per_page}
					onPageChange={setPage}
				/>
			)}

			<AnimatePresence>
				{modal.type === MODAL.FORM && (
					<SessionFormModal
						session={modal.data}
						onClose={close}
						onSuccess={(wasEditing) =>
							handleSuccess(
								wasEditing ? MODAL.UPDATED : MODAL.CREATED,
							)
						}
					/>
				)}
				{modal.type === MODAL.SET_CURRENT && (
					<SetCurrentSessionModal
						session={modal.data}
						currentName={currentSession?.name}
						isSubmitting={setCurrent.isPending}
						error={
							setCurrent.isError
								? getErrorMessage(setCurrent.error)
								: null
						}
						onConfirm={handleConfirmSetCurrent}
						onClose={close}
					/>
				)}
				{modal.type === MODAL.CREATED && (
					<AddSuccessModal
						onClose={close}
						text='Academic Session Created'
					/>
				)}
				{modal.type === MODAL.UPDATED && (
					<AddSuccessModal
						onClose={close}
						text='Academic Session Updated'
					/>
				)}
				{modal.type === MODAL.SWITCHED && (
					<AddSuccessModal
						onClose={close}
						text='Current Session Switched'
					/>
				)}
			</AnimatePresence>
		</EntityPageShell>
	);
}
