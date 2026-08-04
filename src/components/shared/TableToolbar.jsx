import Person from '../../assets/svg/add-person.svg?react';
import Plus from '../../assets/svg/plus.svg?react';
import FilterIcon from '../../assets/svg/filter.svg?react';
import ExportIcon from '../../assets/svg/export.svg?react';

import { Button } from '../ui/Button';
import SearchInput from '../ui/SearchInput';

export default function TableToolbar({
	search,
	onSearch,
	onAdd,
	onFilter,
	onImport,
	onExport,
	isExporting = false,
	exportError,
	addLabel,
	searchPlaceholder,
}) {
	return (
		<div className='flex flex-col lg:flex-row items-center justify-between gap-4 pt-3.5 px-6'>
			<div className='w-full flex flex-col lg:flex-row items-center gap-3'>
				<Button onClick={onAdd}>
					<span className='relative w-fit p-1 rounded-[10px] [&_path]:stroke-white [&_path]:fill-white'>
						<Person className='size-3.75' />
						<Plus className='absolute top-0 right-0 size-2' />
					</span>

					{addLabel}
				</Button>

				<SearchInput
					value={search}
					onChange={onSearch}
					placeholder={searchPlaceholder}
				/>
			</div>

			<div className='flex items-center gap-2'>
				{/* Only the people pages import — the courses page shares this
				    toolbar and has no CSV format behind it. */}
				{onImport && (
					<Button variant='secondary' onClick={onImport}>
						<ExportIcon className='size-5 rotate-180' />
						Import
					</Button>
				)}

				<Button variant='secondary' onClick={onFilter}>
					<FilterIcon className='size-5' />
					Filter
				</Button>

				<Button
					variant='secondary'
					onClick={onExport}
					disabled={isExporting}
				>
					<ExportIcon className='size-5' />
					{isExporting ? 'Exporting…' : 'Export'}
				</Button>
			</div>

			{/* A download has no visible result on the page when it works, so a
			    failure has to say so explicitly or it looks the same. */}
			{exportError && (
				<p
					role='alert'
					className='w-full text-sm text-red-600 lg:text-right'
				>
					{exportError}
				</p>
			)}
		</div>
	);
}
