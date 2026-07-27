import { useAcademicSessions } from '../../../hooks/useAcademicSessions';

const SEMESTERS = [
	{ value: 'first', label: '1st Semester' },
	{ value: 'second', label: '2nd Semester' },
];

export default function AcademicSession({
	sessionId,
	onSessionChange,
	semester,
	onSemesterChange,
}) {
	const { data: sessions, isLoading } = useAcademicSessions();

	return (
		<div className='flex gap-3 lg:max-w-96 w-full'>
			<div className='flex flex-col gap-2 w-full'>
				<label
					htmlFor='session-select'
					className='text-xs font-medium text-dark'
				>
					Academic Session
				</label>
				<select
					id='session-select'
					value={sessionId ?? ''}
					onChange={(e) => onSessionChange?.(e.target.value)}
					disabled={isLoading}
					className='bg-white border border-brand-orange rounded-[10px] p-2.5 text-xs text-black'
				>
					{sessions?.map((session) => (
						<option key={session.id} value={session.id}>
							{session.name}
						</option>
					))}
				</select>
			</div>
			<div className='flex flex-col gap-2 w-full'>
				<label
					htmlFor='semester-select'
					className='text-xs font-medium text-dark'
				>
					Semester
				</label>
				<select
					id='semester-select'
					value={semester}
					onChange={(e) => onSemesterChange?.(e.target.value)}
					className='bg-white border border-brand-orange rounded-[10px] p-2.5 text-xs text-black'
				>
					{SEMESTERS.map((s) => (
						<option key={s.value} value={s.value}>
							{s.label}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
