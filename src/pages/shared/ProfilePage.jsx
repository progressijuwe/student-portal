import { useState, useEffect, useMemo } from 'react';
import PageHeading from '../../components/ui/PageHeading';
import ProfileCard from '../../sections/shared/profile/ProfileCard';
import ProfileDownloads from '../../sections/shared/profile/ProfileDownloads';
import ProfileInfo from '../../sections/shared/profile/ProfileInfo';
import { useProfile } from '../../hooks/useProfile';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import { useStudentDashboard } from '../../hooks/student/useStudentDashboard';
import { transformProfile } from '../../utils/transformProfile';

export default function ProfilePage() {
	const { data: rawUser, isLoading, isError } = useProfile();
	const isStudent = rawUser?.role === 'student';
	const [saveError, setSaveError] = useState(null);

	const { data: dashboard } = useStudentDashboard({ enabled: isStudent });

	const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile();

	const [isEditing, setIsEditing] = useState(false);
	const [formValues, setFormValues] = useState({});

	const user = useMemo(
		() => (rawUser ? transformProfile(rawUser, dashboard?.cgpa) : null),
		[rawUser, dashboard?.cgpa],
	);

	useEffect(() => {
		if (user && isEditing) {
			setFormValues({
				phone: user.phone ?? '',
				address: user.address ?? '',
				dob: user.dob ?? '',
				emergencyContactName: user.emergencyContactName ?? '',
				emergencyContactNumber: user.emergencyContactNumber ?? '',
				prefix: user.prefix ?? '',
				highestQualification: user.highestQualification ?? '',
				specialization: user.specialization ?? '',
			});
		}
	}, [isEditing, user]);

	const handleFieldChange = (key, value) => {
		setFormValues((prev) => ({ ...prev, [key]: value }));
	};

	const handleSave = () => {
		setSaveError(null);
		updateProfile(
			{
				phone: formValues.phone,
				address: formValues.address,
				date_of_birth: formValues.dob || null,
				emergency_contact_name: formValues.emergencyContactName,
				emergency_contact_phone: formValues.emergencyContactNumber,
				...(rawUser?.role === 'lecturer'
					? {
							prefix: formValues.prefix,
							highest_qualification:
								formValues.highestQualification,
							specialization: formValues.specialization,
						}
					: {}),
			},
			{
				onSuccess: () => setIsEditing(false),
				onError: (error) => {
					console.error(
						'Profile save failed:',
						error.response?.data ?? error,
					);
					setSaveError(
						error.response?.data?.message ??
							'Failed to save profile.',
					);
				},
			},
		);
	};

	if (isLoading) return <p className='p-6 text-sm text-label'>Loading...</p>;
	if (isError || !user)
		return (
			<p className='p-6 text-sm text-red-500'>Couldn't load profile.</p>
		);

	return (
		<div className=' px-4 lg:px-6 py-5 w-full flex flex-col gap-7.5 lg:gap-10'>
			<section className='flex flex-col gap-5'>
				<PageHeading
					title='Profile Details'
					description='Manage your basic account details and personal information'
				/>
				<ProfileCard
					{...user}
					isEditing={isEditing}
					onEditClick={() => setIsEditing(true)}
					onSaveClick={handleSave}
					isSaving={isSaving}
				/>
			</section>
			<section className='flex flex-col lg:flex-row gap-6'>
				{saveError && (
					<p className='text-red-500 text-xs'>{saveError}</p>
				)}
				<ProfileInfo
					user={user}
					isEditing={isEditing}
					formValues={formValues}
					onFieldChange={handleFieldChange}
				/>
				<ProfileDownloads />
			</section>
		</div>
	);
}
