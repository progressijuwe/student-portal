/**
 * Formats the academic level the API supplies, e.g. "400" -> "400 Level".
 *
 * The level is deliberately not derived here any more. It used to be computed
 * from `new Date().getFullYear() - entryYear`, which counts from the calendar
 * year, while the API counts from the current academic session's start year.
 * The two disagreed for the whole of the first semester, so the header called a
 * student "500 Level" while the page beneath it and every admin screen said
 * 400. `UserResource.level` is the single authoritative value.
 *
 * @param {string|number|null|undefined} level
 * @returns {string} The formatted level, or '' when the level is unknown.
 */
export function formatLevel(level) {
	if (level === null || level === undefined || level === '') return '';

	return `${level} Level`;
}
