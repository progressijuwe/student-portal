/**
 * Saves a Blob to the user's machine.
 *
 * Endpoints behind `auth:sanctum` cannot be reached with a plain anchor href —
 * the browser would issue that request without the bearer token and get a 401.
 * So the file is fetched through axios like any other call and handed to the
 * user from memory instead.
 */
export function downloadBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');

	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	link.remove();

	// Revoking immediately can cancel the download in some browsers; a tick
	// later the save is already under way.
	setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Builds a CSV from rows of plain values.
 *
 * Quotes every field and doubles any embedded quote, so a name containing a
 * comma cannot shift the remaining columns — which, in a file of credentials,
 * would silently pair people with the wrong password.
 */
export function toCsv(rows) {
	return rows
		.map((row) =>
			row
				.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`)
				.join(','),
		)
		.join('\r\n');
}
