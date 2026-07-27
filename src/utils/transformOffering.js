export function transformOffering(offering) {
	return {
		offeringId: offering.id,
		code: offering.course.code,
		title: offering.course.title,
		units: offering.course.credit_units,
		type: offering.course.type,
		lecturer: offering.lecturer?.name ?? 'TBA',
	};
}
