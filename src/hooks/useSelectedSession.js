import { useState } from 'react';
import { useAcademicSessions } from './useAcademicSessions';

/**
 * The academic session and semester a page is currently showing.
 *
 * Defaults to the session flagged current, falling back to the most recent one,
 * until the user picks something else.
 *
 * The default is *derived*, not synced. Four components previously seeded this
 * from `useEffect(() => { if (sessions && !sessionId) setSessionId(...) })`,
 * which meant an extra render pass on every mount and a window where sessionId
 * was null — so the dependent query fired once with no session, then again with
 * one.
 *
 * The semester default is derived the same way, from the selected session's
 * `current_semester`. Three screens previously opened on `useState('first')`,
 * which is simply wrong from January onward: a student checking results during
 * the second semester was shown an empty first-semester table and had to work
 * out for themselves that the dropdown was the problem. Changing session
 * re-derives it rather than pinning every session to whatever was last viewed.
 */
export function useSelectedSession() {
	const { data: sessions, isPending, isError } = useAcademicSessions();
	const [chosenId, setChosenId] = useState(null);
	const [chosenSemester, setChosenSemester] = useState(null);

	const fallback =
		sessions?.find((session) => session.is_current) ?? sessions?.[0];

	const sessionId = chosenId ?? (fallback ? String(fallback.id) : null);

	const selectedSession = sessions?.find(
		(session) => String(session.id) === String(sessionId),
	);

	// `first` stays the last resort for a session with no dates configured. The
	// API applies the same rule, so the two agree rather than the UI asking for
	// one semester and the server answering about another.
	const semester =
		chosenSemester ?? selectedSession?.current_semester ?? 'first';

	const setSessionId = (id) => {
		setChosenId(id);
		setChosenSemester(null);
	};

	return {
		sessions: sessions ?? [],
		sessionId,
		setSessionId,
		selectedSession,
		semester,
		setSemester: setChosenSemester,
		isPending,
		isError,
	};
}
