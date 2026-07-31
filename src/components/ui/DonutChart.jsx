import { useState, useEffect } from 'react';

export default function DonutChart({ percent = 90, size = 56, stroke = 6 }) {
	const r = (size - stroke) / 2;
	const circ = 2 * Math.PI * r;

	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => setCurrent(percent), 100);
		return () => clearTimeout(timer);
	}, [percent]);

	const offset = circ * (1 - current / 100);

	return (
		<svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
			<circle
				cx={size / 2}
				cy={size / 2}
				r={r}
				fill='none'
				stroke='#e5e7eb'
				strokeWidth={stroke}
			/>
			<circle
				cx={size / 2}
				cy={size / 2}
				r={r}
				fill='none'
				stroke='#f97316'
				strokeWidth={stroke}
				strokeDasharray={circ}
				strokeDashoffset={-offset}
				strokeLinecap='round'
				style={{ transition: 'stroke-dashoffset 1s ease' }}
			/>
		</svg>
	);
}
