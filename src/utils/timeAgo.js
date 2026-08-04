const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

/**
 * "3 minutes ago", "yesterday", "12 Aug".
 *
 * Anything older than a week is given as a date instead of a running count —
 * "37 days ago" is harder to place than "12 Aug".
 */
export function timeAgo(value) {
	if (!value) return '';

	const then = new Date(value);

	if (Number.isNaN(then.getTime())) return '';

	const seconds = Math.floor((Date.now() - then.getTime()) / 1000);

	if (seconds < 45) return 'just now';
	if (seconds < MINUTE * 2) return 'a minute ago';
	if (seconds < HOUR) return `${Math.floor(seconds / MINUTE)} minutes ago`;
	if (seconds < HOUR * 2) return 'an hour ago';
	if (seconds < DAY) return `${Math.floor(seconds / HOUR)} hours ago`;
	if (seconds < DAY * 2) return 'yesterday';
	if (seconds < DAY * 7) return `${Math.floor(seconds / DAY)} days ago`;

	return then.toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'short',
		...(then.getFullYear() === new Date().getFullYear()
			? {}
			: { year: 'numeric' }),
	});
}
