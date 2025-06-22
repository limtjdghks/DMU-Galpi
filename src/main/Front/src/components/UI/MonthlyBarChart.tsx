import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis} from 'recharts'
import {useStatStore} from '../../store/Store'
import {JSX} from 'react'

const MonthlyBarChart = ():JSX.Element => {
	const monthlyStats = useStatStore((state) => state.monthlyStats)

	if (monthlyStats.length === 0) return <p>데이터가 없습니다.</p>

	return (
        <div className='w-full flex justify-center'>
		<BarChart width={450} height={230} data={monthlyStats}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="month" />
			<YAxis />
			<Tooltip />
			<Bar dataKey="count" fill="#82ca9d" />
		</BarChart>
        </div>
	)
}

export default MonthlyBarChart