export function getInitials(name = '') {
	return name
		.split(' ')
		.map((n) => n[0])
		.slice(0, 2)
		.join('')
		.toUpperCase();
}
