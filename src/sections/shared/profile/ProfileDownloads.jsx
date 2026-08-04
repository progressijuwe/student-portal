import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Files from '../../../assets/svg/files.svg?react';
import Transcript from '../../../assets/svg/transcript.svg?react';
import DateIcon from '../../../assets/svg/date.svg?react';
import Download from '../../../assets/svg/download.svg?react';
import TranscriptModal from '../../student/results/TranscriptModal';
import { useClassSchedule } from '../../../hooks/useClassSchedule';
import { downloadBlob, toCsv } from '../../../utils/downloadFile';
import { transformTimetable } from '../../../utils/transformTimetable';

export default function ProfileDownloads({ role }) {
	const [showTranscript, setShowTranscript] = useState(false);

	const { data: schedule, isPending: isScheduleLoading } =
		useClassSchedule(role);

	const classes = transformTimetable(schedule?.timetable);

	// Students receive the session as an object carrying its dates; lecturers
	// receive just the name.
	const sessionName =
		typeof schedule?.session === 'string'
			? schedule.session
			: schedule?.session?.name;

	const handleDownloadSchedule = () => {
		const rows = [
			['Class schedule'],
			['Session', sessionName ?? ''],
			[],
			['Day', 'Starts', 'Ends', 'Code', 'Course', 'Venue', 'Building'],
			...classes.map((entry) => [
				entry.day,
				entry.startTime,
				entry.endTime,
				entry.code,
				entry.name,
				entry.room,
				entry.building,
			]),
		];

		downloadBlob(
			new Blob([toCsv(rows)], { type: 'text/csv;charset=utf-8;' }),
			`class-schedule-${(sessionName ?? 'session').replace(/\W+/g, '-')}.csv`,
		);
	};

	const downloads = [
		// Lecturers have no transcript — they are not assessed.
		...(role === 'student'
			? [
					{
						key: 'transcript',
						icon: <Transcript />,
						label: 'Unofficial Transcript',
						meta: 'Every released result',
						onClick: () => setShowTranscript(true),
						disabled: false,
					},
				]
			: []),
		{
			key: 'schedule',
			icon: <DateIcon />,
			label: 'Class Schedule',
			meta: isScheduleLoading
				? 'Loading…'
				: classes.length > 0
					? `CSV · ${classes.length} class${classes.length === 1 ? '' : 'es'}${
							sessionName ? ` · ${sessionName}` : ''
						}`
					: 'Nothing scheduled yet',
			onClick: handleDownloadSchedule,
			disabled: isScheduleLoading || classes.length === 0,
		},
	];

	return (
		<div className='flex w-full flex-col gap-3 lg:max-w-81'>
			<span className='flex gap-2.5'>
				<Files className='size-4 lg:size-6' />
				<h4 className='text-sm font-semibold text-black lg:text-xl'>
					Quick Downloads
				</h4>
			</span>

			<div className='flex flex-col gap-4.5 rounded-[10px] bg-white px-9.5 py-7'>
				{downloads.map((record) => (
					<div
						className='flex items-center justify-between gap-3'
						key={record.key}
					>
						<div className='flex items-center gap-2.5 [&>svg]:size-4 lg:[&>svg]:size-5'>
							{record.icon}
							<div>
								<p className='text-sm font-semibold text-black'>
									{record.label}
								</p>
								<span className='text-xs font-medium text-label'>
									{record.meta}
								</span>
							</div>
						</div>

						<button
							type='button'
							onClick={record.onClick}
							disabled={record.disabled}
							aria-label={`Download ${record.label}`}
							className='disabled:cursor-not-allowed disabled:opacity-40'
						>
							<Download />
						</button>
					</div>
				))}
			</div>

			<AnimatePresence>
				{showTranscript && (
					<TranscriptModal onClose={() => setShowTranscript(false)} />
				)}
			</AnimatePresence>
		</div>
	);
}
