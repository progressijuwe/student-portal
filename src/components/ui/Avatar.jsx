import { useState } from 'react';
import { getInitials } from '../../utils/getInitials';

export default function Avatar({ src, name, size = 'md' }) {
	// Falls back to initials when the remote image 404s or Cloudinary is down.
	// The error state was declared but never set, so a broken image URL showed
	// a broken-image icon instead of the fallback.
	const [error, setError] = useState(false);

	const sizes = {
		sm: 'size-6 text-[10px]',
		md: 'size-12 text-sm',
		lg: 'size-20 lg:size-24 text-lg',
	};

	return (
		<div
			className={`rounded-full bg-brand-blue flex items-center justify-center overflow-hidden ${sizes[size]}`}
		>
			{src && !error ? (
				<img
					src={src}
					alt={name}
					loading='lazy'
					onError={() => setError(true)}
					className='w-full h-full object-cover border-2 border-brand-orange rounded-full'
				/>
			) : (
				<span className='text-white flex items-center justify-center text-center font-black w-full h-full bg-brand-red rounded-full'>
					{getInitials(name)}
				</span>
			)}
		</div>
	);
}
