import { useState } from 'react';
import { useAcademicSessions } from './useAcademicSessions';

/**
 * The academic session a page is currently showing.
 *
 * Defaults to the session flagged current, falling back to the most recent one,
 * until the user picks something else.
 *
 * The default is *derived*, not synced. Four components previously seeded this
 * from `useEffect(() => { if (sessions && !sessionId) setSessionId(...) })`,
 * which meant an extra render pass on every mount and a window where sessionId
 * was null — so the dependent query fired once with no session, then again with
 * one.
 */
export function useSelectedSession() {
	const { data: sessions, isPending, isError } = useAcademicSessions();
	const [chosenId, setChosenId] = useState(null);

	const fallback =
		sessions?.find((session) => session.is_current) ?? sessions?.[0];

	const sessionId = chosenId ?? (fallback ? String(fallback.id) : null);

	return {
		sessions: sessions ?? [],
		sessionId,
		setSessionId: setChosenId,
		isPending,
		isError,
	};
}
