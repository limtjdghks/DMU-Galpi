import {JSX, useEffect} from 'react'
import Book from '../components/UI/Book'
import RecordBoard from '../components/UI/RecordBoard'
import {useModalOpenStore} from '../store/Store'
import Modal from '../components/layout/Modal'
import Recording from '../components/UI/Recording'

const RecordPage = (): JSX.Element => {
	const { modalOpen, setModalOpen } = useModalOpenStore()

	useEffect(() => {
		console.log(modalOpen)
	}, [modalOpen])

	return (
		<div className='w-full px-[10%]'>
			<div className='mt-20 flex flex-row'>
				{/*여기는 도서 정보 출력 부분*/}
				<Book />
				<div className='ml-32 flex flex-col gap-12'>
					<div className='mt-3 flex space-x-96'>
						<p className='text-[20px]'>별점 ★★★★★</p>
						<p className='text-[20px]'>읽은 기간</p>
					</div>
					<div>
						<p className='text-[20px]'>책 제목</p>
						<p className='text-gray-400'>저자 ooo | 장르 ooo |</p>
					</div>
					<div>
						<p className='text-gray-400'>줄거리</p>
					</div>
				</div>
			</div>
			{/* 한줄긋기 */}
			<div className='mt-20 w-full border-t-2 border-black'/>
			<div className='mt-8'>
				{/*나의 기록 부분 */}
				<div className='flex justify-between'>
					<p className='text-[24px]'>나의 기록</p>
					<button className='rounded-lg bg-MainColor px-8 py-1' onClick={() => setModalOpen(true)}>
						작성하기
					</button>
				</div>
				<div className='mt-12 flex justify-center'>
					<RecordBoard />
				</div>
			</div>
			{modalOpen && (
				<Modal>
					<Recording />
				</Modal>
			)}
		</div>
	)
}

export default RecordPage