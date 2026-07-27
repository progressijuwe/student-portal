import { useRef } from 'react';
import Camera from '../../../assets/svg/camera.svg?react';
import Edit from '../../../assets/svg/edit.svg?react';
import Save from '../../../assets/svg/save.svg?react';
import { Button } from '../../../components/ui/Button';
import { useUploadProfilePhoto } from '../../../hooks/useProfilePhoto';
import { getInitials } from '../../../utils/getInitials';

export default function ProfileCard({
	role,
	prefix,
	name,
	id,
	dept,
	faculty,
	studyYear,
	CGPA,
	profilePhoto,
	isEditing,
	onEditClick,
	onSaveClick,
	isSaving,
}) {
	const isStudent = role === 'student';
	const fileInputRef = useRef(null);
	const { mutate: uploadPhoto, isPending: isUploadingPhoto } =
		useUploadProfilePhoto();

	const handlePhotoClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (e) => {
		const file = e.target.files?.[0];
		if (file) uploadPhoto(file);
	};

	return (
		<div className='bg-white py-5 px-2 lg:px-9 rounded-[10px] w-full flex flex-col lg:flex-row justify-between items-center gap-3.5'>
			<div className='flex flex-col lg:flex-row items-center gap-5 lg:gap-9'>
				<span className='relative'>
					{profilePhoto ? (
						<img
							src={profilePhoto}
							alt='Profile Photo'
							className='rounded-full w-25 h-25 lg:w-34 lg:h-34 object-cover border border-brand-orange'
						/>
					) : (
						<div className='rounded-full w-25 h-25 lg:w-34 lg:h-34 bg-brand-red flex items-center justify-center border border-brand-orange'>
							<span className='text-white font-black text-2xl lg:text-4xl'>
								{getInitials(name)}
							</span>
						</div>
					)}
					<button
						type='button'
						onClick={handlePhotoClick}
						disabled={isUploadingPhoto}
						aria-label='Change profile photo'
						className='absolute bottom-0 right-0'
					>
						<Camera />
					</button>
					<input
						ref={fileInputRef}
						type='file'
						accept='image/*'
						onChange={handleFileChange}
						className='hidden'
					/>
				</span>

				<div className='flex flex-col items-center lg:items-start gap-2 lg:gap-3'>
					<div className='flex flex-col gap-2'>
						<div className='flex flex-col gap-0.75'>
							<h3 className='font-semibold text-sm lg:text-xl text-center lg:text-left'>
								{prefix && `${prefix} `}
								{name}
							</h3>

							<div className='flex text-xs lg:text-sm gap-1 font-medium'>
								<span className='text-brand-orange'>
									{id} |
								</span>
								<span className='text-label'>{dept}</span>
							</div>
						</div>

						{/* Lecturer only */}
						{!isStudent && faculty && (
							<span className='w-fit text-sm px-2.5 py-1.25 rounded-[10px] bg-brand text-brand-orange'>
								{faculty}
							</span>
						)}
					</div>

					{/* Student only */}
					{isStudent && (
						<div className='flex gap-5 items-center text-xs lg:text-sm'>
							<span className='px-2.5 py-1.25 lg:bg-[#DFDFDF94] rounded-[10px] font-medium text-label'>
								Year: {studyYear}
							</span>
							<span className='px-2.5 py-1.25 lg:bg-[#DFDFDF94] rounded-[10px] font-medium text-label'>
								CGPA: {CGPA}
							</span>
						</div>
					)}
				</div>
			</div>

			<div className='flex gap-5 items-center text-xs lg:text-sm'>
				{isEditing ? (
					<Button onClick={onSaveClick} disabled={isSaving}>
						<Save />
						{isSaving ? 'Saving...' : 'Save Profile'}
					</Button>
				) : (
					<Button variant='secondary' onClick={onEditClick}>
						<Edit />
						Edit Profile
					</Button>
				)}
			</div>
		</div>
	);
}
