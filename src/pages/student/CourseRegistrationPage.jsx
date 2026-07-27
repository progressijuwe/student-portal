import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CourseCard from '../../sections/student/courseRegistration/CourseCard';
import UnitLoadSummary from '../../sections/student/courseRegistration/UnitLoadSummary';
import MyRegistrations from '../../sections/student/courseRegistration/MyRegistrations';
import SearchInput from '../../components/ui/SearchInput';
import { useAvailableOfferings } from '../../hooks/student/useAvailableOfferings';
import { useSubmitRegistration } from '../../hooks/student/useSubmitRegistration';
import { useMyEnrollments } from '../../hooks/student/useMyEnrollments';
import { useAcademicRules } from '../../hooks/useAcademicRules';
import { useAcademicSessions } from '../../hooks/useAcademicSessions';
import { transformOffering } from '../../utils/transformOffering';

const SEMESTER = 'first'; // TODO: wire to an actual semester selector if needed later

const TABS = {
	REGISTER: 'register',
	MY_REGISTRATIONS: 'my_registrations',
};

export default function CourseRegistrationPage() {
	const [activeTab, setActiveTab] = useState(TABS.REGISTER);

	const {
		data: rawOfferings,
		isLoading,
		isError,
	} = useAvailableOfferings({ semester: SEMESTER });
	const { data: rules } = useAcademicRules();
	const { data: sessions } = useAcademicSessions();
	const {
		mutate: submitRegistration,
		isPending: isSubmitting,
		error: submitError,
	} = useSubmitRegistration();

	const currentSessionId = sessions?.find((s) => s.is_current)?.id;
	const {
		data: myEnrollments,
		isLoading: isLoadingEnrollments,
		isError: isEnrollmentsError,
	} = useMyEnrollments({
		sessionId: currentSessionId,
		semester: SEMESTER,
	});

	const availableCourses = useMemo(
		() => (rawOfferings ?? []).map(transformOffering),
		[rawOfferings],
	);

	const [selected, setSelected] = useState([]);
	const [search, setSearch] = useState('');
	const [summaryOpen, setSummaryOpen] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const totalUnits = selected.reduce((sum, c) => sum + c.units, 0);

	const filtered = useMemo(() => {
		const q = search.toLowerCase();
		if (!q) return availableCourses;
		return availableCourses.filter(
			(c) =>
				c.code.toLowerCase().includes(q) ||
				c.title.toLowerCase().includes(q) ||
				c.lecturer.toLowerCase().includes(q),
		);
	}, [search, availableCourses]);

	const handleToggle = (course) => {
		setSelected((prev) =>
			prev.find((c) => c.offeringId === course.offeringId)
				? prev.filter((c) => c.offeringId !== course.offeringId)
				: [...prev, course],
		);
	};

	const handleRemove = (course) => {
		setSelected((prev) =>
			prev.filter((c) => c.offeringId !== course.offeringId),
		);
	};

	const handleSubmit = () => {
		setSubmitSuccess(false);
		submitRegistration(
			selected.map((c) => c.offeringId),
			{
				onSuccess: () => {
					setSubmitSuccess(true);
					setSelected([]);
				},
			},
		);
	};

	const minUnits = rules?.min_credit_units_per_semester ?? 0;
	const maxUnits = rules?.max_credit_units_per_semester ?? 24;

	return (
		<div className='py-6 px-5 lg:px-8 flex flex-col gap-6'>
			<h1 className='text-xl lg:text-3xl font-semibold text-black'>
				Course Registration
			</h1>

			{/* Tabs */}
			<div className='flex gap-6 border-b border-border'>
				<button
					onClick={() => setActiveTab(TABS.REGISTER)}
					className={`w-full flex justify-center items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
						activeTab === TABS.REGISTER
							? 'border-brand-orange text-brand-orange bg-[#FFE9DB]'
							: 'border-transparent text-label hover:text-black'
					}`}
				>
					Register
				</button>
				<button
					onClick={() => setActiveTab(TABS.MY_REGISTRATIONS)}
					className={`w-full flex justify-center items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
						activeTab === TABS.MY_REGISTRATIONS
							? 'border-brand-orange text-brand-orange bg-[#FFE9DB]'
							: 'border-transparent text-label hover:text-black'
					}`}
				>
					My Registrations
				</button>
			</div>

			{activeTab === TABS.MY_REGISTRATIONS ? (
				<MyRegistrations
					enrollments={myEnrollments}
					isLoading={isLoadingEnrollments}
					isError={isEnrollmentsError}
				/>
			) : (
				<>
					{submitSuccess && (
						<p className='text-sm text-green-600 bg-green-50 px-4 py-3 rounded-[10px]'>
							Registration submitted successfully — pending admin
							approval.
						</p>
					)}
					{submitError && (
						<p className='text-sm text-red-500 bg-red-50 px-4 py-3 rounded-[10px]'>
							{submitError.response?.data?.message ??
								'Failed to submit registration.'}
						</p>
					)}

					{isLoading ? (
						<p className='text-sm text-label'>
							Loading available courses...
						</p>
					) : isError ? (
						<p className='text-sm text-red-500'>
							Couldn't load available courses.
						</p>
					) : (
						<div className='flex gap-6 items-start'>
							{/* Left — course list */}
							<div className='flex flex-col gap-4 w-full'>
								<SearchInput
									value={search}
									onChange={setSearch}
									placeholder='Search by course code, course title or lecturer'
									className='w-full'
								/>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
									{filtered.map((course) => (
										<CourseCard
											key={course.offeringId}
											course={course}
											isSelected={
												!!selected.find(
													(c) =>
														c.offeringId ===
														course.offeringId,
												)
											}
											onToggle={handleToggle}
										/>
									))}
									{filtered.length === 0 && (
										<p className='text-sm text-label col-span-2 text-center py-10'>
											{availableCourses.length === 0
												? 'No courses are available for registration right now.'
												: 'No courses match your search.'}
										</p>
									)}
								</div>
							</div>

							{/* Right — Unit Load Summary (desktop only) */}
							<aside className='hidden lg:block w-96 shrink-0 border border-border rounded-[10px] p-5 bg-white sticky top-6'>
								<UnitLoadSummary
									selected={selected}
									onRemove={handleRemove}
									onSubmit={handleSubmit}
									minUnits={minUnits}
									maxUnits={maxUnits}
									isSubmitting={isSubmitting}
								/>
							</aside>
						</div>
					)}

					{/* Mobile sticky button */}
					<div className='lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-border z-40'>
						<button
							onClick={() => setSummaryOpen(true)}
							className='w-full bg-brand-red text-white py-3 rounded-[10px] text-sm font-semibold flex items-center justify-center gap-2'
						>
							Unit Load Summary
							<span className='bg-white text-brand-red text-xs font-bold px-2 py-0.5 rounded-full'>
								{totalUnits} units
							</span>
						</button>
					</div>

					{/* Mobile bottom sheet */}
					<AnimatePresence>
						{summaryOpen && (
							<>
								<motion.div
									className='fixed inset-0 bg-black/40 z-50 lg:hidden'
									onClick={() => setSummaryOpen(false)}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									aria-hidden='true'
								/>
								<motion.div
									className='fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[20px] p-5 max-h-[85vh] overflow-y-auto lg:hidden'
									initial={{ y: '100%' }}
									animate={{ y: 0 }}
									exit={{ y: '100%' }}
									transition={{
										type: 'spring',
										stiffness: 300,
										damping: 30,
									}}
								>
									<div className='w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4' />
									<UnitLoadSummary
										selected={selected}
										onRemove={handleRemove}
										onSubmit={() => {
											handleSubmit();
											setSummaryOpen(false);
										}}
										minUnits={minUnits}
										maxUnits={maxUnits}
										isSubmitting={isSubmitting}
									/>
								</motion.div>
							</>
						)}
					</AnimatePresence>
				</>
			)}
		</div>
	);
}
