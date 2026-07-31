export const assessmentComponents = [
	{ label: 'CA', marks: 20 },
	{ label: 'Project', marks: 20 },
	{ label: 'Exam', marks: 60 },
];

export const gradeScale = [
	{ grade: 'A', min: 95, max: 100 },
	{ grade: 'A-', min: 89, max: 94 },
	{ grade: 'B+', min: 83, max: 88 },
	{ grade: 'B', min: 77, max: 82 },
	{ grade: 'B-', min: 71, max: 76 },
	{ grade: 'C+', min: 65, max: 70 },
	{ grade: 'C', min: 59, max: 64 },
	{ grade: 'C-', min: 53, max: 58 },
	{ grade: 'D', min: 48, max: 52 },
	{ grade: 'F', min: 0, max: 47 },
];

export const gradeColor = (grade) => {
	if (grade.startsWith('A')) return 'bg-[#DCFCE7] text-[#016630]';
	if (grade.startsWith('B')) return 'bg-[#D9E9FF] text-[#002C7D]';
	if (grade.startsWith('C')) return 'bg-[#FFF600] text-[#A65F00]';
	if (grade.startsWith('D')) return 'bg-[#FFCAFE] text-[#A600A3]';
	if (grade.startsWith('E')) return 'bg-[#FFE7D9] text-[#FE6201]';
	if (grade.startsWith('F')) return 'bg-[#FFE2E2] text-[#CC1100]';
	return 'bg-red-100 text-red-700';
};
