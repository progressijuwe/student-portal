import { useState } from 'react';

/**
 * Shows a one-time credential the administrator has to pass on by hand.
 *
 * No mail service is configured, so this panel is the only place the temporary
 * password is ever legible — it is not stored client-side and reopening the
 * record will not bring it back. The copy is blunt about that on purpose:
 * dismissing this dialog without noting the password means the account has to
 * be reset again.
 */
export default function TemporaryPassword({ email, password }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(password);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Clipboard access can be denied or unavailable over plain HTTP.
			// The password is on screen either way, so this is not worth an
			// error state — it just means copying has to be manual.
			setCopied(false);
		}
	};

	return (
		<div className='flex flex-col gap-3 rounded-[10px] border border-brand-orange bg-[#FFF7ED] p-4'>
			<div className='flex flex-col gap-1'>
				<p className='text-sm font-semibold text-black'>
					Temporary password
				</p>
				<p className='text-xs text-label'>
					Give this to the user directly — it is shown once and cannot
					be retrieved later. They will be asked to choose a new
					password when they first sign in.
				</p>
			</div>

			{email && (
				<dl className='flex flex-col gap-1 text-xs'>
					<div className='flex gap-2'>
						<dt className='text-label'>Email</dt>
						<dd className='font-medium break-all'>{email}</dd>
					</div>
				</dl>
			)}

			<div className='flex items-center gap-2'>
				<code className='flex-1 rounded-[5px] border border-border bg-white px-3 py-2 font-mono text-sm break-all'>
					{password}
				</code>
				<button
					type='button'
					onClick={handleCopy}
					className='rounded-[10px] border border-brand-red px-3 py-2 text-sm text-[#940002] hover:bg-[#FFEFEF]'
				>
					{copied ? 'Copied' : 'Copy'}
				</button>
			</div>

			{/* Announced politely so a screen reader confirms the copy without
			    interrupting whatever is being read. */}
			<p aria-live='polite' className='sr-only'>
				{copied ? 'Temporary password copied to clipboard' : ''}
			</p>
		</div>
	);
}
