import { useRef, useState } from 'react';
import Modal from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { useDepartments } from '../../../hooks/useDepartments';
import { useBulkImportUsers } from '../../../hooks/admin/useBulkImportUsers';
import { fetchCsvTemplate } from '../../../api/admin';
import { downloadBlob, toCsv } from '../../../utils/downloadFile';
import { getErrorMessage } from '../../../utils/getErrorMessage';

const MAX_BYTES = 2 * 1024 * 1024; // mirrors the API's `max:2048` kilobytes

const COLUMNS = {
	student: ['name', 'email', 'department_id', 'study_type', 'entry_year'],
	lecturer: [
		'name',
		'email',
		'department_id',
		'prefix',
		'highest_qualification',
		'specialization',
	],
};

/**
 * Creates a cohort of accounts from a CSV.
 *
 * Two things drive the shape of this dialog. The file needs a numeric
 * `department_id`, which nobody knows off the top of their head, so the
 * reference list is on screen while they work rather than somewhere else. And
 * every imported account comes back with a temporary password that exists
 * nowhere else — with no mail service, an import of two hundred students is two
 * hundred passwords the admin has to keep, which is a download, not a table to
 * read. Both halves of the result are shown: what was created, and what was
 * rejected and why.
 */
export default function BulkImportModal({ role, onClose, onImported }) {
	const fileInputRef = useRef(null);
	const { data: faculties = [] } = useDepartments();
	const { mutateAsync: importUsers, isPending } = useBulkImportUsers();

	const [file, setFile] = useState(null);
	const [fileError, setFileError] = useState(null);
	const [submitError, setSubmitError] = useState(null);
	const [result, setResult] = useState(null);
	const [templateError, setTemplateError] = useState(null);

	const label = role === 'student' ? 'students' : 'lecturers';

	const handleFileChange = (event) => {
		const selected = event.target.files?.[0] ?? null;
		setFileError(null);
		setSubmitError(null);

		if (!selected) {
			setFile(null);
			return;
		}

		// Checked here as well as server-side so an obviously wrong file is
		// rejected before it is uploaded, not after.
		if (!/\.(csv|txt)$/i.test(selected.name)) {
			setFile(null);
			setFileError('Choose a .csv file.');
			return;
		}

		if (selected.size > MAX_BYTES) {
			setFile(null);
			setFileError('The file must be 2MB or smaller.');
			return;
		}

		setFile(selected);
	};

	const handleDownloadTemplate = async () => {
		setTemplateError(null);
		try {
			const blob = await fetchCsvTemplate(role);
			downloadBlob(blob, `${role}_import_template.csv`);
		} catch (error) {
			setTemplateError(getErrorMessage(error));
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setSubmitError(null);

		if (!file) {
			setFileError('Choose a file to import.');
			return;
		}

		try {
			const data = await importUsers({ file, role });
			setResult(data);
			onImported?.();
		} catch (error) {
			// A malformed header comes back as a 422 with a message naming the
			// columns that were expected, which is exactly what to show.
			setSubmitError(
				getErrorMessage(error, {
					500: 'The import failed. Please try again.',
				}),
			);
		}
	};

	const handleDownloadCredentials = () => {
		const idColumn = role === 'student' ? 'student_id' : 'staff_id';

		const rows = [
			['name', 'email', idColumn, 'temporary_password'],
			...result.created.map((user) => [
				user.name,
				user.email,
				user[idColumn],
				user.temporary_password,
			]),
		];

		downloadBlob(
			new Blob([toCsv(rows)], { type: 'text/csv;charset=utf-8;' }),
			`${role}_credentials.csv`,
		);
	};

	const handleImportAnother = () => {
		setResult(null);
		setFile(null);
		setFileError(null);
		if (fileInputRef.current) fileInputRef.current.value = '';
	};

	if (result) {
		return (
			<Modal
				heading='Import Complete'
				description={`${result.created.length} created, ${result.failed.length} rejected`}
				onClose={onClose}
			>
				<div className='flex flex-col gap-5 px-4 pb-4'>
					{result.created.length > 0 && (
						<div className='flex flex-col gap-3 rounded-[10px] border border-brand-orange bg-[#FFF7ED] p-4'>
							<div className='flex flex-col gap-1'>
								<p className='text-sm font-semibold text-black'>
									Save these credentials now
								</p>
								<p className='text-xs text-label'>
									Each account has a temporary password shown
									only here. Download the file before closing
									— it cannot be recovered afterwards, only
									reset one account at a time.
								</p>
							</div>
							<div>
								<Button onClick={handleDownloadCredentials}>
									Download credentials CSV
								</Button>
							</div>
						</div>
					)}

					{result.created.length > 0 && (
						<details className='rounded-[10px] border border-border'>
							<summary className='cursor-pointer px-4 py-3 text-sm font-medium'>
								{result.created.length} account
								{result.created.length === 1 ? '' : 's'} created
							</summary>
							<div className='max-h-56 overflow-y-auto px-4 pb-3'>
								<table className='w-full text-xs'>
									<thead className='text-left text-label'>
										<tr>
											<th className='py-1'>Name</th>
											<th className='py-1'>Email</th>
											<th className='py-1'>Password</th>
										</tr>
									</thead>
									<tbody>
										{result.created.map((user) => (
											<tr
												key={user.id}
												className='border-t border-border'
											>
												<td className='py-1.5'>
													{user.name}
												</td>
												<td className='py-1.5 break-all'>
													{user.email}
												</td>
												<td className='py-1.5 font-mono'>
													{user.temporary_password}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</details>
					)}

					{result.failed.length > 0 && (
						<div className='flex flex-col gap-2'>
							<p className='text-sm font-semibold text-[#9F0712]'>
								{result.failed.length} row
								{result.failed.length === 1 ? '' : 's'} rejected
							</p>
							<p className='text-xs text-label'>
								Nothing was created for these. Correct them in
								the file and import it again — the rows above
								will be skipped as duplicates.
							</p>
							<ul className='flex max-h-56 flex-col gap-2 overflow-y-auto'>
								{result.failed.map((row, index) => (
									<li
										key={`${row.row ?? 'unknown'}-${index}`}
										className='rounded-[10px] bg-red-50 px-3 py-2 text-xs text-red-700'
									>
										<span className='font-semibold'>
											Row {row.row ?? '?'}
										</span>
										{row.data?.email
											? ` · ${row.data.email}`
											: ''}
										<ul className='mt-1 list-disc pl-4'>
											{(row.errors ?? []).map(
												(message, errorIndex) => (
													<li key={errorIndex}>
														{message}
													</li>
												),
											)}
										</ul>
									</li>
								))}
							</ul>
						</div>
					)}

					<div className='flex justify-end gap-3'>
						<Button
							variant='tertiary'
							onClick={handleImportAnother}
						>
							Import another file
						</Button>
						<Button onClick={onClose}>Done</Button>
					</div>
				</div>
			</Modal>
		);
	}

	return (
		<Modal
			heading={`Import ${label}`}
			description={`Create many ${label} at once from a CSV file`}
			onClose={onClose}
		>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-5 px-4 pb-4'
			>
				<section className='flex flex-col gap-2'>
					<h3 className='text-sm font-semibold text-black'>
						1. Start from the template
					</h3>
					<p className='text-xs text-label'>
						The file must have exactly these columns, in this order:{' '}
						<code className='font-mono'>
							{COLUMNS[role].join(', ')}
						</code>
					</p>
					<div>
						<Button
							variant='secondary'
							onClick={handleDownloadTemplate}
						>
							Download template
						</Button>
					</div>
					{templateError && (
						<p role='alert' className='text-xs text-red-500'>
							{templateError}
						</p>
					)}
				</section>

				<section className='flex flex-col gap-2'>
					<h3 className='text-sm font-semibold text-black'>
						2. Look up the department IDs
					</h3>
					<p className='text-xs text-label'>
						The <code className='font-mono'>department_id</code>{' '}
						column takes the number below, not the department name.
					</p>
					<div className='max-h-40 overflow-y-auto rounded-[10px] border border-border'>
						<table className='w-full text-xs'>
							<caption className='sr-only'>
								Department reference
							</caption>
							<thead className='sticky top-0 bg-[#F9F9FF] text-left text-label'>
								<tr>
									<th className='px-3 py-1.5'>ID</th>
									<th className='px-3 py-1.5'>Department</th>
									<th className='px-3 py-1.5'>Faculty</th>
								</tr>
							</thead>
							<tbody>
								{faculties.flatMap((faculty) =>
									(faculty.departments ?? []).map(
										(department) => (
											<tr
												key={department.id}
												className='border-t border-border'
											>
												<td className='px-3 py-1.5 font-mono font-semibold'>
													{department.id}
												</td>
												<td className='px-3 py-1.5'>
													{department.name}
												</td>
												<td className='px-3 py-1.5 text-label'>
													{faculty.name}
												</td>
											</tr>
										),
									),
								)}
							</tbody>
						</table>
					</div>
				</section>

				<section className='flex flex-col gap-2'>
					<h3 className='text-sm font-semibold text-black'>
						3. Upload the completed file
					</h3>
					<label htmlFor='import-file' className='sr-only'>
						CSV file
					</label>
					<input
						id='import-file'
						ref={fileInputRef}
						type='file'
						accept='.csv,text/csv'
						onChange={handleFileChange}
						aria-describedby={
							fileError ? 'import-file-error' : undefined
						}
						className='rounded-[5px] border border-border px-4 py-3 text-sm file:mr-3 file:rounded-[5px] file:border-0 file:bg-brand-red file:px-3 file:py-1.5 file:text-white'
					/>
					{fileError && (
						<p
							id='import-file-error'
							role='alert'
							className='text-xs text-red-500'
						>
							{fileError}
						</p>
					)}
				</section>

				{submitError && (
					<p
						role='alert'
						className='rounded-[10px] bg-red-50 px-4 py-3 text-sm text-red-600'
					>
						{submitError}
					</p>
				)}

				<div className='flex justify-end gap-3'>
					<Button
						variant='tertiary'
						onClick={onClose}
						disabled={isPending}
					>
						Cancel
					</Button>
					<Button type='submit' disabled={isPending || !file}>
						{isPending ? 'Importing…' : 'Import'}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
