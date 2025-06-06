import { JSX } from "react";
import MainPanel from '../components/UI/MainPanel'
import BookCard from '../components/UI/BookCard'

const MainPage = (): JSX.Element => {
	const exam = [
		{
			title: '알라딘',
			tag: '만화',
		},
		{
			title: '소년이 온다',
			tag: '소설',
		},
		{
			title: '세이노의 가르침',
			tag: '자기계발',
		},
		{
			title: '세이노의 가르침',
			tag: '자기계발',
		},
	]

	return (
		<>
			<div className='flex min-h-[40vh] w-full items-center justify-center rounded-b-[60px] bg-MainColor'>
				<div className='mx-[10%] flex w-full flex-row items-center justify-between'>
					<MainPanel width={'40%'} height={'300px'} title='최애 장르'>
						<div>아 귀찮아</div>
					</MainPanel>
					<MainPanel width={'35%'} height={'300px'} title='이달의 기록 현황'>
						<div>아 너무귀찮아</div>
					</MainPanel>
				</div>
			</div>
			<div className='px-[5%] pt-4'>
                {/* 추천 도서 */}
				<p className='text-[20px] font-bold'>기록 기준 추천 도서</p>
				<div className='z-1 relative flex h-[45vh] w-full items-center justify-center bg-white'>
					<div className='flex flex-row gap-[150px]'>
                        {/* 추천 도서 데이터 출력 */}
						{exam.map(({ title, tag }, idx) => (
							<BookCard key={idx} title={title} tag={tag} />
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default MainPage