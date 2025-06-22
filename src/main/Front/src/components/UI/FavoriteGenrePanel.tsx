import {Cell, Pie, PieChart, Tooltip} from 'recharts'
import {useStatStore} from '../../store/Store'
import {JSX} from 'react'

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57']

const GenrePieChart = (): JSX.Element => {
	const genreStats = useStatStore((state) => state.genreStats)

	if (genreStats.length === 0) return <p>데이터가 없습니다.</p>

	const top3 = genreStats
		.slice()
		.sort((a, b) => b.value - a.value)
		.slice(0, 3)

	return (
		<div className='flex flex-row justify-between'>
			{/* 1~3위 장르 텍스트 */}
			<div className='flex flex-col justify-center gap-8 ml-12'>
				{top3.map((item, index) => (
					<p key={index}>
						{index + 1}. {item.name}
					</p>
				))}
			</div>

			{/* 원형 차트 */}
			<PieChart width={250} height={200}>
				<Pie data={genreStats} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={80} fill='#8884d8' label>
					{genreStats.map((_, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
			</PieChart>
		</div>
	)
}

export default GenrePieChart