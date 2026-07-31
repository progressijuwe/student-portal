import Search from '../../../assets/svg/search.svg?react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';

export default function StudentSearch({ onSearch }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const value = searchParams.get('q') || '';

	// The URL is the single source of truth. Previously this mirrored the query
	// string into local state inside an effect, which meant every URL change
	// triggered a setState-during-effect and a second render pass — and the two
	// copies could disagree after a back/forward navigation.
	const debounced = useDebouncedValue(value, 400);

	useEffect(() => {
		onSearch(debounced);
	}, [debounced, onSearch]);

	return (
		<div className='rounded-[10px] bg-white p-6 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1)]'>
			<span className='relative flex items-center gap-2 rounded-[10px] border border-[#D1D5DC] p-2'>
				<Search aria-hidden='true' className='size-5' />
				<label htmlFor='student-search' className='sr-only'>
					Search students by name or matric number
				</label>
				<input
					id='student-search'
					type='search'
					value={value}
					placeholder='Search by name or matric number...'
					className='w-full text-sm placeholder:text-sm placeholder:text-[#0A0A0A80] lg:placeholder:text-base'
					onChange={(event) =>
						setSearchParams(
							(previous) => {
								const next = new URLSearchParams(previous);

								if (event.target.value)
									next.set('q', event.target.value);
								else next.delete('q');

								return next;
							},
							{ replace: true },
						)
					}
				/>
			</span>
		</div>
	);
}
