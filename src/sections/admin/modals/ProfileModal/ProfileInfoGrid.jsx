import Email from '../../../../assets/svg/email.svg?react';
import Phone from '../../../../assets/svg/phone.svg?react';
import House from '../../../../assets/svg/house.svg?react';

const INFO_CONFIG = {
	email: {
		Icon: Email,
		bg: 'bg-brand-blue',
		iconColor: 'text-brand-blue-border',
	},
	phone: { Icon: Phone, bg: 'bg-[#D2FFE2]', iconColor: 'text-[#014018]' },
	address: { Icon: House, bg: 'bg-[#FFE4E4]', iconColor: 'text-brand-red' },
	emergencyContact: {
		Icon: Phone,
		bg: 'bg-[#F3E8FF]',
		iconColor: 'text-[#9810FA]',
	},
};

export default function ProfileInfoGrid({ user }) {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 px-4'>
			<Info {...INFO_CONFIG.email} label='Email'>
				{user.email || 'Not Provided'}
			</Info>
			<Info {...INFO_CONFIG.phone} label='Phone'>
				{user.phone || 'Not Provided'}
			</Info>
			<Info {...INFO_CONFIG.address} label='Address'>
				{user.address || 'No address yet'}
			</Info>
			<Info {...INFO_CONFIG.emergencyContact} label='Emergency Contact'>
				{user.emergencyPhone || 'Not Provided'}
			</Info>
		</div>
	);
}

function Info({
	Icon,
	label,
	children,
	bg = 'bg-gray-100',
	iconColor = 'text-black',
}) {
	return (
		<div className='flex gap-4 items-start'>
			{Icon && (
				<span className={`p-2 rounded-lg ${bg}`}>
					<Icon
						className={`size-5 ${iconColor} [&_path]:stroke-current [&_path]:stroke-0.5`}
					/>
				</span>
			)}

			<div className='flex flex-col text-sm'>
				<span className='text-label text-xs'>{label}</span>
				<span className='font-medium text-sm text-black'>
					{children}
				</span>
			</div>
		</div>
	);
}
