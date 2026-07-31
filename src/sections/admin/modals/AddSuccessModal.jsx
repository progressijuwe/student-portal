import { motion } from 'framer-motion';
import Modal from '../../../components/ui/Modal';
import Thumb from '../../../assets/svg/thumb.svg?react';

export default function AddSuccessModal({ onClose, text }) {
	return (
		<Modal onClose={onClose}>
			<div
				role='status'
				aria-live='polite'
				className='flex flex-col items-center justify-center gap-4 py-10 px-6'
			>
				<motion.span
					initial={{ rotate: 25, scale: 0.8 }}
					animate={{ rotate: 0, scale: 1 }}
					transition={{
						duration: 1.5,
						ease: 'easeOut',
					}}
					className='p-3 bg-[#DCFCE7] rounded-full'
				>
					<Thumb className='size-10 [&_path]:stroke-[#00A63E]' />
				</motion.span>

				<p className='font-medium text-sm text-black text-center'>
					{text}
				</p>
			</div>
		</Modal>
	);
}
