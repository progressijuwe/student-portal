import { formatLevel } from './formatLevel';

export function transformProfile(user, cgpa) {
	if (!user) return null;

	const isStudent = user.role === 'student';
	const isLecturer = user.role === 'lecturer';

	return {
		role: user.role,
		prefix: isLecturer ? user.lecturer_profile?.prefix : null,
		name: user.name,
		id: isStudent ? user.student_id : 'Lecturer',
		dept: user.department?.name,
		faculty: user.department?.faculty,
		studyYear: isStudent ? formatLevel(user.level) : null,
		CGPA: isStudent ? (cgpa ?? '0.00') : null,
		profilePhoto: user.profile_photo_url,
		email: user.email,
		phone: user.phone,
		address: user.address,
		dob: user.date_of_birth,
		emergencyContactName: user.emergency_contact?.name,
		emergencyContactNumber: user.emergency_contact?.phone,
		highestQualification: isLecturer
			? user.lecturer_profile?.highest_qualification
			: null,
		specialization: isLecturer
			? user.lecturer_profile?.specialization
			: null,
	};
}
