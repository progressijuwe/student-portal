import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LineElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Tooltip,
	Filler,
} from 'chart.js';
import { useGpaRecords } from '../../../hooks/student/useGpaRecords';

ChartJS.register(
	LineElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Tooltip,
	Filler,
);

const chartAreaBackground = {
	id: 'chartAreaBackground',
	beforeDraw(chart) {
		const {
			ctx,
			chartArea: { left, top, width, height },
		} = chart;
		ctx.save();
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(left, top, width, height);
		ctx.restore();
	},
};

const options = {
	responsive: true,
	maintainAspectRatio: false,
	backgroundColor: '#ffffff',
	plugins: {
		legend: { display: false },
		tooltip: {
			callbacks: {
				label: (ctx) => ` ${ctx.parsed.y.toFixed(2)} / 4.00`,
			},
		},
	},
	scales: {
		y: {
			offset: true,
			min: 0,
			max: 4,
			ticks: {
				stepSize: 0.5,
				color: '#9ca3af',
				font: (ctx) => ({ size: ctx.chart.width < 500 ? 8 : 12 }),
			},
			grid: { display: false },
			border: { display: true },
		},
		x: {
			offset: true,
			ticks: {
				color: '#9ca3af',
				font: (ctx) => ({ size: ctx.chart.width < 500 ? 8 : 12 }),
			},
			grid: { display: false },
			border: { display: true },
		},
	},
};

export default function GpaChart() {
	const { data, isLoading, isError } = useGpaRecords();

	if (isLoading) {
		return (
			<section className='border border-brand-border rounded-[20px] py-3 px-2 md:px-4 flex items-center justify-center w-full lg:w-2/3 h-50 md:h-full'>
				<p className='text-sm text-label'>Loading...</p>
			</section>
		);
	}

	if (isError || !data?.records?.length) {
		return (
			<section className='border border-brand-border rounded-[20px] py-3 px-2 md:px-4 flex flex-col gap-3 w-full lg:w-2/3'>
				<div className='flex flex-col gap-1 px-3'>
					<h2 className='font-medium text-sm text-black'>
						Grade Point Average
					</h2>
					<p className='text-xs font-medium text-label'>
						Track your grade point average
					</p>
				</div>
				<p className='text-sm text-label px-3 py-8 text-center'>
					No GPA records yet.
				</p>
			</section>
		);
	}

	// The API orders records by academic period, oldest first, so they are
	// already in the order the chart plots them. This used to reverse the array
	// on the assumption that the controller returned newest-first; it did not,
	// so the trend line ran backwards and a rising GPA was drawn as a decline.
	const chronological = data.records;
	const labels = chronological.map(
		(r) =>
			`${r.session?.name ?? ''} ${r.semester === 'first' ? '1st' : '2nd'} Sem`,
	);
	const gpaValues = chronological.map((r) => parseFloat(r.gpa));

	const chartData = {
		labels,
		datasets: [
			{
				data: gpaValues,
				borderColor: '#f97316',
				backgroundColor: 'transparent',
				fill: true,
				tension: 0.4,
				pointBackgroundColor: '#f97316',
				pointRadius: 4,
				pointHoverRadius: 6,
			},
		],
	};

	return (
		<section className='border border-brand-border rounded-[20px] py-3 px-2 md:px-4 flex flex-col gap-3 justify-between w-full lg:w-2/3'>
			<div className='flex flex-col gap-1 px-3'>
				<h2 className='font-medium text-sm text-black'>
					Grade Point Average
				</h2>
				<p className='text-xs font-medium text-label'>
					Track your grade point average
				</p>
			</div>
			<div className='max-h-50 md:max-h-full h-full w-full'>
				<Line
					data={chartData}
					options={options}
					plugins={[chartAreaBackground]}
				/>
			</div>
		</section>
	);
}
