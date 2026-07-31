import ClockIcon from '../../../assets/svg/clock.svg?react';
import ApprovedIcon from '../../../assets/svg/approved.svg?react';
import RejectedIcon from '../../../assets/svg/close.svg?react';

const tabs = [
	{ key: 'pending', label: 'Pending Approval', Icon: ClockIcon },
	{ key: 'approved', label: 'Approved', Icon: ApprovedIcon },
	{ key: 'rejected', label: 'Rejected', Icon: RejectedIcon },
];

export default function ResultsTabs({ activeTab, counts, onTabChange }) {
	return (
		<>
			{/* Mobile */}
			<div className='lg:hidden px-4 pt-4'>
				<select
					value={activeTab}
					onChange={(e) => onTabChange(e.target.value)}
					className='w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-orange'
				>
					{tabs.map((tab) => (
						<option key={tab.key} value={tab.key}>
							{tab.label} ({counts[tab.key] ?? 0})
						</option>
					))}
				</select>
			</div>

			{/* Desktop */}
			<div className='hidden lg:flex border-b border-border'>
				{tabs.map((tab) => (
					<button
						key={tab.key}
						onClick={() => onTabChange(tab.key)}
						className={`w-full flex justify-center items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
							activeTab === tab.key
								? 'border-brand-red text-brand-red'
								: 'border-transparent text-label hover:text-black'
						}`}
					>
						<tab.Icon className='size-4' aria-hidden='true' />
						{tab.label}
						<span
							className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
								activeTab === tab.key
									? 'bg-brand-red text-white'
									: 'bg-gray-100 text-label'
							}`}
						>
							{counts[tab.key] ?? 0}
						</span>
					</button>
				))}
			</div>
		</>
	);
}
