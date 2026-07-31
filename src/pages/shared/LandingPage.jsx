import { Link } from 'react-router-dom';
import logo from '../../assets/images/portal-logo.png';
import { useAuth } from '../../context/useAuth';

import RegistrationIcon from '../../assets/svg/registration.svg?react';
import TranscriptIcon from '../../assets/svg/transcript.svg?react';
import CalendarIcon from '../../assets/svg/calendar.svg?react';
import ApprovedIcon from '../../assets/svg/approved.svg?react';
import StudentsIcon from '../../assets/svg/students.svg?react';
import LecturersIcon from '../../assets/svg/lecturers.svg?react';
import BadgeIcon from '../../assets/svg/badge.svg?react';

const ROLE_DASHBOARDS = {
	student: '/student/dashboard',
	lecturer: '/lecturer/dashboard',
	admin: '/admin/dashboard',
};

/**
 * What each role gets. Deliberately describes the behaviour that actually
 * exists in the application rather than aspirational copy — a landing page that
 * promises features the portal does not have is a support ticket waiting to
 * happen.
 */
const ROLES = [
	{
		id: 'student',
		title: 'Students',
		Icon: StudentsIcon,
		accent: 'var(--color-brand-blue-border)',
		tint: 'var(--color-brand-blue)',
		points: [
			'Register for courses within your semester credit limits',
			'See your timetable, venue and the walk to your next class',
			'Track approved results, GPA and CGPA across every semester',
		],
	},
	{
		id: 'lecturer',
		title: 'Lecturers',
		Icon: LecturersIcon,
		accent: 'var(--color-brand-orange)',
		tint: 'var(--color-brand)',
		points: [
			'See the class list for every course you are assigned',
			'Save marks as a draft, then submit the sheet for approval',
			'Get told when results are approved — or sent back with a reason',
		],
	},
	{
		id: 'admin',
		title: 'Administrators',
		Icon: BadgeIcon,
		accent: 'var(--color-badge-border)',
		tint: 'var(--color-badge)',
		points: [
			'Approve or reject course registrations, one student at a time',
			'Review submitted results per course before they reach students',
			'Manage students, lecturers, courses, venues and the timetable',
		],
	},
];

const FEATURES = [
	{
		Icon: RegistrationIcon,
		title: 'Registration with real rules',
		body: 'Credit limits, duplicate checks and semester boundaries are enforced when a student submits — not after an administrator notices.',
	},
	{
		Icon: ApprovedIcon,
		title: 'Nothing published unreviewed',
		body: 'Marks go from draft, to submitted, to approved. Only approved results reach a student, and every decision is recorded with who made it.',
	},
	{
		Icon: TranscriptIcon,
		title: 'GPA that stays correct',
		body: 'Approving a backdated result recalculates the full history, so a CGPA is never left stale by results arriving out of order.',
	},
	{
		Icon: CalendarIcon,
		title: 'Timetable without clashes',
		body: 'Venue and lecturer conflicts are caught as the schedule is built, so two classes can never be booked into one room.',
	},
];

const STEPS = [
	{
		number: '01',
		title: 'Register',
		body: 'A student picks courses for the semester. The portal checks the credit load before anything is submitted.',
	},
	{
		number: '02',
		title: 'Approve',
		body: 'An administrator reviews the whole submission and approves or rejects it in one action.',
	},
	{
		number: '03',
		title: 'Teach and grade',
		body: 'The lecturer sees their class list, records CA, project and exam marks, and submits the sheet.',
	},
	{
		number: '04',
		title: 'Publish',
		body: 'Once approved, results appear on the student record and the GPA recalculates automatically.',
	},
];

export default function LandingPage() {
	const { user } = useAuth();
	const dashboard = user ? (ROLE_DASHBOARDS[user.role] ?? '/login') : null;

	return (
		<div className='flex min-h-screen flex-col bg-white font-body text-body'>
			{/* Keyboard users should not have to tab through the whole nav. */}
			<a
				href='#main'
				className='sr-only rounded-sm bg-brand-red px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50'
			>
				Skip to content
			</a>

			<header className='sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-sm'>
				<nav
					aria-label='Primary'
					className='mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 lg:px-8'
				>
					<span className='flex items-center gap-2.5'>
						<img
							src={logo}
							alt=''
							className='size-9 object-contain'
						/>
						<span className='text-base font-semibold text-dark'>
							Student Portal
						</span>
					</span>

					<div className='flex items-center gap-2'>
						<a
							href='#roles'
							className='hidden rounded-sm px-3 py-2 text-sm font-medium text-label hover:text-dark sm:block'
						>
							Who it's for
						</a>
						<a
							href='#how-it-works'
							className='hidden rounded-sm px-3 py-2 text-sm font-medium text-label hover:text-dark sm:block'
						>
							How it works
						</a>

						{user ? (
							<Link
								to={dashboard}
								className='rounded-sm bg-brand-red px-5 py-2.5 text-sm font-medium text-white'
							>
								Go to dashboard
							</Link>
						) : (
							<Link
								to='/login'
								className='rounded-sm bg-brand-red px-5 py-2.5 text-sm font-medium text-white'
							>
								Sign in
							</Link>
						)}
					</div>
				</nav>
			</header>

			<main id='main' className='flex-1'>
				{/* ---------------------------------------------------- hero */}
				<section className='border-b border-border bg-brand/40'>
					<div className='mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-24'>
						<div className='flex flex-col items-start gap-6'>
							<h1 className='text-[34px] font-semibold leading-[1.15] text-dark lg:text-[52px]'>
								One portal for registration,
								<span className='text-brand-red'>
									{' '}
									results and records
								</span>
							</h1>

							<p className='max-w-xl text-base leading-7 text-body lg:text-lg'>
								Students register for courses and track their
								results. Lecturers submit marks for the classes
								they teach. Administrators approve both. Every
								rule is enforced by the system, not by
								convention.
							</p>

							<div className='flex flex-wrap items-center gap-3'>
								<Link
									to={user ? dashboard : '/login'}
									className='rounded-sm bg-brand-red px-6 py-3 text-sm font-medium text-white lg:text-base'
								>
									{user
										? 'Go to your dashboard'
										: 'Sign in to your account'}
								</Link>
								<a
									href='#roles'
									className='rounded-sm border border-brand-red px-6 py-3 text-sm font-medium text-brand-red lg:text-base'
								>
									See what you get
								</a>
							</div>

							<p className='text-xs text-label'>
								Accounts are issued by your department. Contact
								your administrator if you cannot sign in.
							</p>
						</div>

						{/* Decorative preview of the result-approval flow. */}
						<div
							aria-hidden='true'
							className='hidden rounded-[20px] border border-border bg-white p-5 shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1)] lg:block'
						>
							<div className='flex items-center justify-between border-b border-border pb-3'>
								<span className='text-sm font-semibold text-dark'>
									Results awaiting approval
								</span>
								<span className='rounded-xl bg-brand px-2 py-0.5 text-xs font-semibold text-brand-red'>
									3 pending
								</span>
							</div>

							<ul className='flex flex-col divide-y divide-border'>
								{[
									{
										code: 'SEN 401',
										title: 'Software Engineering Security',
										count: 43,
									},
									{
										code: 'CSC 411',
										title: 'Computer Network Security',
										count: 50,
									},
									{
										code: 'SEN 404',
										title: 'Object Oriented Analysis',
										count: 38,
									},
								].map((row) => (
									<li
										key={row.code}
										className='flex items-center justify-between gap-4 py-3'
									>
										<span className='flex flex-col'>
											<span className='text-sm font-semibold text-brand-red'>
												{row.code}
											</span>
											<span className='text-xs text-label'>
												{row.title}
											</span>
										</span>
										<span className='text-xs font-medium text-label'>
											{row.count} students
										</span>
									</li>
								))}
							</ul>

							<div className='mt-3 flex items-center gap-2 rounded-[10px] bg-brand-blue px-4 py-3'>
								<ApprovedIcon className='size-4 shrink-0' />
								<span className='text-xs font-medium text-brand-blue-border'>
									Approving a sheet recalculates every
									affected student's GPA.
								</span>
							</div>
						</div>
					</div>
				</section>

				{/* --------------------------------------------------- roles */}
				<section
					id='roles'
					aria-labelledby='roles-heading'
					className='mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-16 lg:px-8 lg:py-20'
				>
					<div className='flex flex-col gap-3 pb-10'>
						<h2
							id='roles-heading'
							className='text-2xl font-semibold text-dark lg:text-[32px]'
						>
							Built around three roles
						</h2>
						<p className='max-w-2xl text-base leading-7 text-body'>
							You only see what your role is responsible for, and
							the portal enforces that on the server — not just in
							the interface.
						</p>
					</div>

					<ul className='grid gap-5 md:grid-cols-3'>
						{ROLES.map((role) => (
							<li
								key={role.id}
								className='flex flex-col gap-4 rounded-[20px] border border-border bg-white p-6'
							>
								<span
									aria-hidden='true'
									className='flex size-11 items-center justify-center rounded-xl'
									style={{ backgroundColor: role.tint }}
								>
									<role.Icon className='size-5' />
								</span>

								<h3
									className='text-lg font-semibold'
									style={{ color: role.accent }}
								>
									{role.title}
								</h3>

								<ul className='flex flex-col gap-3'>
									{role.points.map((point) => (
										<li
											key={point}
											className='flex items-start gap-2.5 text-sm leading-6 text-body'
										>
											<span
												aria-hidden='true'
												className='mt-2 size-1.5 shrink-0 rounded-full'
												style={{
													backgroundColor:
														role.accent,
												}}
											/>
											{point}
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</section>

				{/* ------------------------------------------------ features */}
				<section
					aria-labelledby='features-heading'
					className='border-y border-border bg-[#F9F9FF]'
				>
					<div className='mx-auto w-full max-w-6xl px-5 py-16 lg:px-8 lg:py-20'>
						<div className='flex flex-col gap-3 pb-10'>
							<h2
								id='features-heading'
								className='text-2xl font-semibold text-dark lg:text-[32px]'
							>
								The rules live in the system
							</h2>
							<p className='max-w-2xl text-base leading-7 text-body'>
								Credit limits, approval states and grade
								calculations are checked every time — so records
								stay consistent even when things arrive out of
								order.
							</p>
						</div>

						<ul className='grid gap-5 sm:grid-cols-2'>
							{FEATURES.map((feature) => (
								<li
									key={feature.title}
									className='flex gap-4 rounded-[20px] border border-border bg-white p-6'
								>
									<span
										aria-hidden='true'
										className='flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-brand'
									>
										<feature.Icon className='size-5' />
									</span>
									<div className='flex flex-col gap-2'>
										<h3 className='text-base font-semibold text-dark'>
											{feature.title}
										</h3>
										<p className='text-sm leading-6 text-body'>
											{feature.body}
										</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				</section>

				{/* --------------------------------------------- how it works */}
				<section
					id='how-it-works'
					aria-labelledby='how-heading'
					className='mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-16 lg:px-8 lg:py-20'
				>
					<div className='flex flex-col gap-3 pb-10'>
						<h2
							id='how-heading'
							className='text-2xl font-semibold text-dark lg:text-[32px]'
						>
							From registration to result
						</h2>
						<p className='max-w-2xl text-base leading-7 text-body'>
							One path through a semester, with an approval step
							wherever a record becomes official.
						</p>
					</div>

					<ol className='grid gap-5 md:grid-cols-2 lg:grid-cols-4'>
						{STEPS.map((step) => (
							<li
								key={step.number}
								className='flex flex-col gap-3 rounded-[20px] border border-border p-6'
							>
								<span className='text-sm font-semibold text-brand-orange'>
									{step.number}
								</span>
								<h3 className='text-base font-semibold text-dark'>
									{step.title}
								</h3>
								<p className='text-sm leading-6 text-body'>
									{step.body}
								</p>
							</li>
						))}
					</ol>
				</section>

				{/* ----------------------------------------------------- cta */}
				<section
					aria-labelledby='cta-heading'
					className='border-t border-border bg-brand/40'
				>
					<div className='mx-auto flex w-full max-w-6xl flex-col items-start gap-5 px-5 py-16 lg:items-center lg:px-8 lg:py-20 lg:text-center'>
						<h2
							id='cta-heading'
							className='text-2xl font-semibold text-dark lg:text-[32px]'
						>
							Ready when you are
						</h2>
						<p className='max-w-xl text-base leading-7 text-body'>
							Sign in with the email address your department
							issued. You will be asked to set your own password
							the first time.
						</p>
						<Link
							to={user ? dashboard : '/login'}
							className='rounded-sm bg-brand-red px-6 py-3 text-sm font-medium text-white lg:text-base'
						>
							{user ? 'Go to your dashboard' : 'Sign in'}
						</Link>
					</div>
				</section>
			</main>

			<footer className='border-t border-border bg-white'>
				<div className='mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-5 py-8 sm:flex-row sm:items-center lg:px-8'>
					<span className='flex items-center gap-2.5'>
						<img
							src={logo}
							alt=''
							className='size-7 object-contain'
						/>
						<span className='text-sm font-medium text-dark'>
							Student Portal
						</span>
					</span>
					<p className='text-xs text-label'>
						Having trouble signing in? Contact your department
						administrator.
					</p>
				</div>
			</footer>
		</div>
	);
}
