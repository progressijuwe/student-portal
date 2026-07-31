import Person from '../../../assets/svg/add-person.svg?react';
import Plus from '../../../assets/svg/plus.svg?react';
import { Button } from '../../../components/ui/Button';
import FilterIcon from '../../../assets/svg/filter.svg?react';
import ExportIcon from '../../../assets/svg/export.svg?react';
import SearchInput from '../../../components/ui/SearchInput';

export default function StudentToolbar({
	search,
	onSearch,
	onAddStudent,
	onFilter,
}) {
	return (
		<div className='flex flex-col lg:flex-row items-center justify-between gap-4 pt-3.5 px-6'>
			<div className='w-full flex flex-col lg:flex-row items-center gap-3'>
				<Button onClick={onAddStudent}>
					<span className='relative w-fit p-1 rounded-[10px] [&_path]:stroke-white [&_path]:fill-white'>
						<Person className='size-3.75' />
						<Plus className='absolute top-0 right-0 size-2' />
					</span>
					Add Student
				</Button>
				<SearchInput
					value={search}
					onChange={onSearch}
					placeholder='Search students'
				/>
			</div>
			<div className='flex items-center gap-2'>
				<Button variant='secondary' onClick={onFilter}>
					<FilterIcon className='size-5' /> Filter
				</Button>
				<Button variant='secondary'>
					<ExportIcon className='size-5' /> Export
				</Button>
			</div>
		</div>
	);
}
