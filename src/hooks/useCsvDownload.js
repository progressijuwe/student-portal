import { useState } from 'react';
import { downloadBlob } from '../utils/downloadFile';
import { getErrorMessage } from '../utils/getErrorMessage';

/**
 * Runs a download that returns a Blob, with the two bits of state every caller
 * needs: whether it is in flight, and what went wrong.
 *
 * A download is one of the few actions with no visible result on the page when
 * it works, so the failure case is the whole point — without this, a rejected
 * export looked identical to a successful one.
 */
export function useCsvDownload() {
	const [isDownloading, setIsDownloading] = useState(false);
	const [error, setError] = useState(null);

	const download = async (fetcher, filename) => {
		setError(null);
		setIsDownloading(true);

		try {
			const blob = await fetcher();
			downloadBlob(blob, filename);
		} catch (caught) {
			// A failed blob request carries its JSON error message inside the
			// Blob body, so it has to be read back out before getErrorMessage
			// can find anything useful in it.
			const payload = caught?.response?.data;

			if (payload instanceof Blob) {
				try {
					caught.response.data = JSON.parse(await payload.text());
				} catch {
					caught.response.data = null;
				}
			}

			setError(
				getErrorMessage(caught, {
					500: 'The download could not be generated. Please try again.',
				}),
			);
		} finally {
			setIsDownloading(false);
		}
	};

	return { download, isDownloading, error, clearError: () => setError(null) };
}
