export function getLevel(entryYear) {
	if (!entryYear) return '';
	const yearsElapsed = new Date().getFullYear() - entryYear;
	const level = Math.min(yearsElapsed * 100 + 100, 500);
	return `${level} Level`;
}
