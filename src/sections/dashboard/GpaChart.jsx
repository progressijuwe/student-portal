import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from 'chart.js'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler)

// ── replace with API data ──
const semesters = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester']
const gpaData   = [3.5, 3.6, 3.75, 3.89, 3.72, 3.64]
// ──────────────────────────

const data = {
    labels: semesters,
    datasets: [{
        data: gpaData,
        borderColor: '#f97316',
        backgroundColor: 'transparent',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#f97316',
        pointRadius: 4,
        pointHoverRadius: 6,
    }]
}
const chartAreaBackground ={
    id: 'chartAreaBackground',
    beforeDraw(chart){
        const { ctx, chartArea: {left, top, width, height}} = chart
        ctx.save()
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(left, top, width, height)
        ctx.restore()
    }
}
const options = {
    responsive: true,
    maintainAspectRatio: false,
    backgroundColor: '#ffffff',

    plugins: {
        legend: { display: false },
        tooltip: {
        callbacks: {
            label: (ctx) => ` ${ctx.parsed.y.toFixed(2)} / 4.00`
        }
        }
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
        ticks: { color: '#9ca3af', font: (ctx) => ({ size: ctx.chart.width < 500 ? 8 : 12 }) },
        grid: { display: false },
        border: { display: true },
    }
  }
}

export default function GpaChart(){

    return(
        <section className="border border-brand-border rounded-[20px] py-3 px-2 md:px-4 flex flex-col gap-3 justify-between w-full lg:w-2/3">
            <div className='flex flex-col gap-1 px-3'>
                <h2 className="font-medium text-sm text-black">Grade Point Average</h2>
                <p className="text-xs font-medium text-label">Track your grade point average</p>
            </div>
            <div className='max-h-50 md:max-h-full h-full w-full'>
                <Line data={data} options={options} plugins={[chartAreaBackground]}/>
            </div>
        </section>
    )
}