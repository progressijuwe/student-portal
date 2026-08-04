/**
 * Central query key factory.
 *
 * Every key used with TanStack Query is defined here so that invalidation is
 * reliable. Ad-hoc arrays scattered across thirty hooks drift silently — a
 * mutation invalidates `['admin','users']` while the query registered
 * `['adminUsers']`, and the UI just stops updating with no error anywhere.
 *
 * Convention: each entry is a function returning an array, and broader keys are
 * prefixes of narrower ones, so `queryClient.invalidateQueries({ queryKey:
 * queryKeys.admin.all() })` clears everything below it.
 */
export const queryKeys = {
	auth: {
		all: () => ['auth'],
		me: () => ['auth', 'me'],
	},

	options: {
		all: () => ['options'],
		departments: () => ['options', 'departments'],
		academicSessions: () => ['options', 'academic-sessions'],
		academicRules: () => ['options', 'academic-rules'],
		studyTypes: () => ['options', 'study-types'],
		prefixes: () => ['options', 'prefixes'],
	},

	profile: {
		all: () => ['profile'],
		detail: () => ['profile', 'detail'],
	},

	/*
	 * Keyed by role because the endpoint is role-scoped: signing out of a
	 * student account and into a lecturer one on the same browser must not
	 * serve the student's notifications from cache.
	 */
	notifications: {
		all: () => ['notifications'],
		list: (role) => ['notifications', role],
	},

	admin: {
		all: () => ['admin'],
		dashboard: () => ['admin', 'dashboard'],
		activity: () => ['admin', 'activity'],

		users: (params = {}) => ['admin', 'users', params],
		user: (id) => ['admin', 'users', 'detail', id],
		userSummary: (id) => ['admin', 'users', 'detail', id, 'summary'],
		userGrades: (id, params = {}) => [
			'admin',
			'users',
			'detail',
			id,
			'grades',
			params,
		],
		userCourses: (id, params = {}) => [
			'admin',
			'users',
			'detail',
			id,
			'courses',
			params,
		],

		courses: (params = {}) => ['admin', 'courses', params],
		offerings: (params = {}) => ['admin', 'offerings', params],
		sessions: (params = {}) => ['admin', 'sessions', params],
		venues: (params = {}) => ['admin', 'venues', params],
		timetable: (params = {}) => ['admin', 'timetable', params],
		registrations: (params = {}) => ['admin', 'registrations', params],
		results: (params = {}) => ['admin', 'results', params],
		resultDetail: (offeringId, params = {}) => [
			'admin',
			'results',
			'detail',
			offeringId,
			params,
		],
	},

	lecturer: {
		all: () => ['lecturer'],
		dashboard: () => ['lecturer', 'dashboard'],
		courses: () => ['lecturer', 'courses'],
		timetable: () => ['lecturer', 'timetable'],
		offeringStudents: (offeringId) => [
			'lecturer',
			'courses',
			offeringId,
			'students',
		],
		grades: (params = {}) => ['lecturer', 'grades', params],
	},

	student: {
		all: () => ['student'],
		dashboard: () => ['student', 'dashboard'],
		courses: () => ['student', 'courses'],
		timetable: () => ['student', 'timetable'],
		grades: (params = {}) => ['student', 'grades', params],
		transcript: () => ['student', 'transcript'],
		gpa: () => ['student', 'gpa'],
		availableOfferings: (params = {}) => [
			'student',
			'available-offerings',
			params,
		],
		enrollments: (params = {}) => ['student', 'enrollments', params],
	},
};
