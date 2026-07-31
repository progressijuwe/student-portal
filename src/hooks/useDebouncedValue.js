import { useEffect, useState } from 'react';

/**
 * Delays propagating a rapidly changing value — typically search input, so a
 * request is not fired per keystroke.
 *
 * The same 300ms timeout was reimplemented in four page components; this is the
 * one copy.
 */
export function useDebouncedValue(value, delay = 300) {
	const [debounced, setDebounced] = useState(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebounced(value), delay);

		return () => clearTimeout(timer);
	}, [value, delay]);

	return debounced;
}
