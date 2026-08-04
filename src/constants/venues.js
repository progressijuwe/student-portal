/**
 * Venue types, mirroring the VenueType enum server-side.
 *
 * The API stores snake_case values and validates against the enum, so the label
 * is presentation only — sending the label back would fail validation.
 */
export const VENUE_TYPES = [
	{ value: 'lecture_hall', label: 'Lecture Hall' },
	{ value: 'laboratory', label: 'Laboratory' },
	{ value: 'seminar_room', label: 'Seminar Room' },
	{ value: 'workshop', label: 'Workshop' },
];

export const VENUE_TYPE_LABELS = Object.fromEntries(
	VENUE_TYPES.map((type) => [type.value, type.label]),
);

/** Mirrors the DayOfWeek enum — the school week is Monday to Friday. */
export const DAYS = [
	{ value: 'monday', label: 'Monday' },
	{ value: 'tuesday', label: 'Tuesday' },
	{ value: 'wednesday', label: 'Wednesday' },
	{ value: 'thursday', label: 'Thursday' },
	{ value: 'friday', label: 'Friday' },
];

export const DAY_LABELS = Object.fromEntries(
	DAYS.map((day) => [day.value, day.label]),
);

/**
 * Times are stored as `HH:MM:SS` but the API validates input as `H:i`, so
 * anything read off a slot has to be trimmed before it goes back.
 */
export function toTimeInput(value) {
	return value ? value.slice(0, 5) : '';
}
