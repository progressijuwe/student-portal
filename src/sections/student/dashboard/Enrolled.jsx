import laptop from '../../../assets/images/laptop.png';
import bars from '../../../assets/images/bars.png';
import { Button } from '../../../components/ui/Button';
import { useCourses } from '../../../hooks/student/useCourses';

const fallbackImages = [laptop, bars];
const PREVIEW_COUNT = 2;

export default function Enrolled() {
	const { data, isLoading, isError } = useCourses();

	const allCourses = data?.courses ?? [];
	const previewCourses = allCourses.slice(0, PREVIEW_COUNT);
	const hasMore = allCourses.length > PREVIEW_COUNT;

	return (
		<section className='w-full lg:w-2/3 flex flex-col gap-4'>
			<div className='flex justify-between'>
				<h3 className='text-base font-medium'>Enrolled Courses</h3>
				{/* TODO: wire to a "See all courses" page once it exists */}
				{hasMore && (
					<button
						type='button'
						className='text-sm text-brand-red font-medium'
						disabled
						title='Coming soon'
					>
						See all
					</button>
				)}
			</div>
			<div className='flex flex-col xl:flex-row gap-4'>
				{isLoading && <p className='text-sm text-label'>Loading...</p>}
				{isError && (
					<p className='text-sm text-red-500'>
						Couldn't load courses.
					</p>
				)}
				{!isLoading && !isError && allCourses.length === 0 && (
					<p className='text-sm text-label'>
						No enrolled courses yet.
					</p>
				)}
				{previewCourses.map((enrollment, i) => (
					<div
						className='w-full flex justify-between border border-brand-border bg-brand px-4 py-3 rounded-[20px]'
						key={enrollment.enrollment_id}
					>
						<div className='flex flex-col gap-2 justify-between items-start'>
							<h4 className='text-sm font-medium'>
								{enrollment.offering?.course?.title}
							</h4>
							<Button>View Grade</Button>
						</div>
						<img
							src={fallbackImages[i % fallbackImages.length]}
							alt='Course Image'
						/>
					</div>
				))}
			</div>
		</section>
	);
}
