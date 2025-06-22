import {JSX} from 'react'
import Book from './Book'
import {useNavigate} from 'react-router-dom'

interface props {
	title: string
	tag: string
	cover: string
	bookId: string
}

const BookCard = ({ title, tag, cover, bookId }: props): JSX.Element => {
	const navigate = useNavigate()

	const handleClick = (id: string) => {
		navigate(`/record?id=${id}`)
	}

	return (
		<div className='relative h-[340px] w-[300px] hover:cursor-pointer' onClick={() => handleClick(bookId)}>
			{/* 흰색 카드 영역 */}
			<div className='absolute bottom-0 flex h-[160px] w-full flex-col justify-end rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
				<div className='text-sm font-semibold text-black'>{title}</div>
				<div className='mt-1 text-xs text-gray-400'>{tag}</div>
			</div>

			{/* 책 이미지 */}
			<div className='absolute left-[40%] top-0 z-10 -translate-x-1/2'>
				<Book imgSrc={cover} />
			</div>
		</div>
	)
}

export default BookCard