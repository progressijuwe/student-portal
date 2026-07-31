import { useState, useMemo } from 'react';
import People from '../../../assets/svg/course.svg?react';
import { Button } from '../../../components/ui/Button';
import DownloadIcon from '../../../assets/svg/download-icon.svg?react';
import Search from '../../../assets/svg/search.svg?react';
import StudentTable from './StudentTable';
import { useOfferingStudents } from '../../../hooks/lecturer/useOfferingStudents';

export default function CourseStudents({ offeringId }) {
	const { data, isLoading, isError } = useOfferingStudents(offeringId);
	const [search, setSearch] = useState('');

	const students = useMemo(() => {
		return (data?.students ?? []).map((entry, i) => ({
			sn: i + 1,
			matric: entry.student.student_id,
			name: entry.student.name,
			dept: entry.student.department?.name ?? '',
		}));
	}, [data]);

	const filtered = useMemo(() => {
		const q = search.toLowerCase();
		if (!q) return students;
		return students.filter(
			(s) =>
				s.name.toLowerCase().includes(q) ||
				s.matric.toLowerCase().includes(q),
		);
	}, [search, students]);

	return (
		<section className='bg-white flex flex-col'>
			<div className='flex flex-col lg:flex-row gap-4 p-4 lg:p-6 lg:items-center lg:justify-between border-b border-[#E5E7EB]'>
				<div className='flex gap-2'>
					<People className='size-4 md:size-5 text-label' />
					<div className='flex flex-col'>
						<h3 className='font-semibold text-base md:text-xl text-[#101828]'>
							Registered Students
						</h3>
						<p className='font-medium text-sm md:text-base text-label'>
							{students.length} Students enrolled
						</p>
					</div>
				</div>
				{/* Export not yet supported by the backend */}
				<Button disabled title='Coming soon'>
					<DownloadIcon className='size-3.5 md:size-4' />
					Export List
				</Button>
			</div>
			<div className='w-full p-4 lg:p-6 border-b border-[#E5E7EB]'>
				<span className='flex items-center gap-2 w-full py-2 px-4 border border-[#D1D5DC] rounded-[10px]'>
					<Search className='size-4 lg:size-5 text-label' />
					<input
						type='search'
						id='registered-student-search'
						placeholder='Search by name or matric number...'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className='w-full text-xs lg:text-base font-medium placeholder:text-label focus:outline-none'
					/>
				</span>
			</div>
			{isLoading ? (
				<p className='text-sm text-label py-10 text-center'>
					Loading students...
				</p>
			) : isError ? (
				<p className='text-sm text-red-500 py-10 text-center'>
					Couldn't load students.
				</p>
			) : filtered.length === 0 ? (
				<p className='text-sm text-label py-10 text-center'>
					{students.length === 0
						? 'No students enrolled yet.'
						: 'No students match your search.'}
				</p>
			) : (
				<StudentTable students={filtered} />
			)}
		</section>
	);
}
