import {
	MIN_UNITS,
	MAX_UNITS,
} from "../../../data/courseRegistrationCoursesData";
import SubmitIcon from "../../../assets/svg/letter.svg?react";

export default function UnitLoadSummary({ selected, onRemove, onSubmit }) {
	const totalUnits = selected.reduce((sum, c) => sum + c.units, 0);
	const remaining = MAX_UNITS - totalUnits;
	const progress = Math.min((totalUnits / MAX_UNITS) * 100, 100);
	const isExceeded = totalUnits > MAX_UNITS;
	const isTooFew = totalUnits < MIN_UNITS;
	const isValid = totalUnits >= MIN_UNITS && totalUnits <= MAX_UNITS;

	const statusLabel = isExceeded ? "Exceeded" : isTooFew ? "Too Few" : "Valid";
	const statusColor = isExceeded
		? "bg-red-100 text-red-600"
		: isTooFew
			? "bg-yellow-100 text-yellow-600"
			: "bg-green-100 text-green-600";
	const barColor = isExceeded
		? "bg-red-500"
		: isTooFew
			? "bg-yellow-400"
			: "bg-green-500";

	return (
		<div className='flex flex-col gap-4'>
			{/* Header */}
			<div className='flex items-center justify-between'>
				<h2 className='text-base font-semibold text-black'>
					Unit Load Summary
				</h2>
				<span
					className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor}`}
				>
					{statusLabel}
				</span>
			</div>

			{/* Progress bar */}
			<div className='flex flex-col gap-1'>
				<div className='flex justify-between text-xs text-label'>
					<span>Units Selected</span>
					<span
						className={`font-semibold ${isExceeded ? "text-red-600" : "text-black"}`}
					>
						{totalUnits}/{MAX_UNITS}
					</span>
				</div>
				<div className='h-2 bg-gray-100 rounded-full overflow-hidden'>
					<div
						className={`h-full rounded-full transition-all duration-300 ${barColor}`}
						style={{ width: `${progress}%` }}
					/>
				</div>
				<div className='flex justify-between text-xs text-label'>
					<span>Min: {MIN_UNITS}</span>
					<span>Max: {MAX_UNITS}</span>
				</div>
			</div>

			{/* Stats */}
			<div className='grid grid-cols-3 gap-2'>
				{[
					{ label: "Courses", value: selected.length },
					{ label: "Units", value: totalUnits, red: true },
					{ label: "Remaining", value: remaining, red: remaining < 0 },
				].map(({ label, value, red }) => (
					<div
						key={label}
						className='border border-border rounded-[10px] p-3 flex flex-col items-center gap-0.5'
					>
						<span
							className={`text-xl font-bold ${red ? "text-brand-red" : "text-black"}`}
						>
							{value}
						</span>
						<span className='text-xs text-label'>{label}</span>
					</div>
				))}
			</div>

			{/* Selected courses */}
			<div className='flex flex-col gap-1'>
				<h3 className='text-sm font-medium text-black'>Selected Courses</h3>
				<div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
					{selected.length === 0 ? (
						<p className='text-xs text-label py-3 text-center'>
							No courses selected yet
						</p>
					) : (
						selected.map((course) => (
							<div
								key={course.code}
								className='flex items-center justify-between gap-2 border border-border rounded-lg px-3 py-2'
							>
								<div className='flex flex-col min-w-0'>
									<span className='text-xs font-semibold text-black truncate'>
										{course.code}
									</span>
									<span className='text-xs text-label truncate'>
										{course.title}
									</span>
								</div>
								<div className='flex items-center gap-2 shrink-0'>
									<span className='text-xs text-label'>
										{course.units}
										{course.units === 1 ? "unit" : "units"}
									</span>
									{course.type !== "Compulsory" && (
										<button
											onClick={() => onRemove(course)}
											aria-label={`Remove ${course.title}`}
											className='text-label hover:text-red-500 transition'
										>
											×
										</button>
									)}
								</div>
							</div>
						))
					)}
				</div>
			</div>

			{/* Warning/error message */}
			{(isExceeded || isTooFew) && (
				<div
					className={`flex items-start gap-2 text-xs px-3 py-2 rounded-lg ${
						isExceeded
							? "bg-red-50 text-red-600"
							: "bg-yellow-50 text-yellow-700"
					}`}
				>
					<span className='shrink-0'>⚠</span>
					<span>
						{isExceeded
							? `You've exceeded the maximum load by ${totalUnits - MAX_UNITS} units. Please remove some courses`
							: `Add at least ${MIN_UNITS - totalUnits} more units to meet the minimum requirement.`}
					</span>
				</div>
			)}

			{/* Submit button */}
			<button
				onClick={onSubmit}
				disabled={!isValid}
				className={`flex items-center justify-center gap-2 w-full py-3 rounded-[10px] text-sm font-semibold transition ${
					isValid
						? "bg-brand-red text-white hover:bg-red-700"
						: "bg-gray-100 text-label cursor-not-allowed"
				}`}
			>
				<SubmitIcon
					className={`size-4 ${isValid ? "[&_path]:stroke-white" : "[&_path]:stroke-label"}`}
					aria-hidden='true'
				/>
				Submit Registration
			</button>
		</div>
	);
}
