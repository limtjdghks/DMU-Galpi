import {JSX, useEffect} from 'react'
import MainPanel from '../components/UI/MainPanel'
import BookCard from '../components/UI/BookCard'
import FavoriteGenrePanel from '../components/UI/FavoriteGenrePanel'
import {useBestSellerStore, useStatStore} from '../store/Store'
import {api} from '../AxiosInstance'
import MonthlyBarChart from '../components/UI/MonthlyBarChart'
import {useAuth} from '../hooks/AuthContext'
import {useNavigate} from 'react-router-dom'

const MainPage = (): JSX.Element => {
	const { isAuthenticated } = useAuth()
	const { setGenreStats, setMonthlyStats } = useStatStore()
	const { data, setData } = useBestSellerStore()
	const navigate = useNavigate()

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const tagRes = await api.get('/api/report/stats/tags')
				const monthlyRes = await api.get('/api/report/stats/monthly')

				const genreList = Object.entries(tagRes.data).map(([key, val]) => ({
					name: key,
					value: Number(val),
				}))
				setGenreStats(genreList)

				const monthlyList = Object.entries(monthlyRes.data).map(([key, val]) => ({
					month: key,
					count: Number(val),
				}))
				setMonthlyStats(monthlyList)
			} catch (e: any) {
				if (e.status === 401) {
					console.log('유저 권한 없음')
				} else {
					console.log(e)
					alert('통계 데이터 로딩 에러')
				}
			}
		}

		const fetchBestsellers = async () => {
			try {
				const res = await api.get('/api/book/bestsellers')
				const items = res.data.item
				const books = items.map((item: any) => ({
					title: item.title,
					tag: item.categoryName,
					cover: item.cover,
					isbn13: item.isbn13
				}))
				setData(books)
			} catch (e: any) {
				console.log(e)
				alert('베스트셀러 데이터 로딩 실패')
			}
		}

		if (isAuthenticated === true) {
			fetchStats()
		}
		fetchBestsellers()
	}, [isAuthenticated, setData, setGenreStats, setMonthlyStats])

	return (
		<>
			<div className='relative flex min-h-[40vh] w-full items-center justify-center rounded-b-[60px] bg-MainColor'>
				{!isAuthenticated && (
					<div
						onClick={() => navigate('/login')}
						className='absolute z-20 flex h-full w-full cursor-pointer items-center justify-center rounded-b-[60px] bg-black opacity-80 text-center text-white'>
						<p className='text-xl font-semibold'>로그인하시면 독서 통계를 확인할 수 있습니다</p>
					</div>
				)}
				<div className='z-10 mx-[10%] flex w-full flex-row items-center justify-between'>
					<MainPanel width={'40%'} height={'300px'} title='장르 통계'>
						<FavoriteGenrePanel />
					</MainPanel>
					<MainPanel width={'35%'} height={'300px'} title='기록 현황'>
						<MonthlyBarChart />
					</MainPanel>
				</div>
			</div>
			<div className='px-[5%] pt-4'>
				{/* 추천 도서 */}
				<p className='text-[20px] font-bold'>알라딘 베스트셀러</p>
				<div className='z-1 relative flex h-[45vh] w-full items-center justify-center bg-white'>
					<div className='flex flex-row gap-[150px]'>
						{/* 추천 도서 데이터 출력 */}
						{Array.isArray(data) && data.map(({ title, tag, cover, isbn13 }, idx) => <BookCard key={idx} title={title} tag={tag} cover={cover} bookId={isbn13} />)}
					</div>
				</div>
			</div>
		</>
	)
}

export default MainPage