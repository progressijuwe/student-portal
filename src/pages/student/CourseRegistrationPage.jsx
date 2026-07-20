import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { availableCourses } from "../../data/courseRegistrationCoursesData";
import CourseCard from "../../sections/student/courseRegistration/CourseCard";
import UnitLoadSummary from "../../sections/student/courseRegistration/UnitLoadSummary";
import SearchInput from "../../components/ui/SearchInput";

export default function CourseRegistrationPage() {
	const compulsoryCourses = availableCourses.filter(
		(c) => c.type === "Compulsory",
	);

	const [selected, setSelected] = useState(compulsoryCourses);
	const [search, setSearch] = useState("");
	const [summaryOpen, setSummaryOpen] = useState(false);

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
	}, [search]);

	const handleToggle = (course) => {
		setSelected((prev) =>
			prev.find((c) => c.code === course.code)
				? prev.filter((c) => c.code !== course.code)
				: [...prev, course],
		);
	};

	const handleRemove = (course) => {
		if (course.type !== "Compulsory") {
			setSelected((prev) => prev.filter((c) => c.code !== course.code));
		}
	};

	const handleSubmit = () => {
		// replace with API call
		alert("Registration submitted!");
	};

	return (
		<div className='py-6 px-5 lg:px-8 flex flex-col gap-6'>
			<h1 className='text-xl lg:text-3xl font-semibold text-black'>
				Course Registration
			</h1>

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
								key={course.code}
								course={course}
								isSelected={!!selected.find((c) => c.code === course.code)}
								onToggle={handleToggle}
							/>
						))}
						{filtered.length === 0 && (
							<p className='text-sm text-label col-span-2 text-center py-10'>
								No courses match your search.
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
					/>
				</aside>
			</div>

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
							initial={{ y: "100%" }}
							animate={{ y: 0 }}
							exit={{ y: "100%" }}
							transition={{ type: "spring", stiffness: 300, damping: 30 }}
						>
							{/* Drag handle */}
							<div className='w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4' />
							<UnitLoadSummary
								selected={selected}
								onRemove={handleRemove}
								onSubmit={() => {
									handleSubmit();
									setSummaryOpen(false);
								}}
							/>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}
