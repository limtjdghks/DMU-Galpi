import { JSX } from 'react'
import Book from './Book'

interface props {
	title: string
	tag: string
}

const BookCard = ({ title, tag }: props): JSX.Element => {
	return (
		<div className='relative h-[340px] w-[300px]'>
			{/* 흰색 카드 영역 */}
			<div className='absolute bottom-0 flex h-[160px] w-full flex-col justify-end rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
				<div className='text-sm font-semibold text-black'>{title}</div>
				<div className='mt-1 text-xs text-gray-400'>{tag}</div>
			</div>

			{/* 책 이미지 */}
			<div className='absolute left-[40%] top-0 z-10 -translate-x-1/2'>
				<Book />
			</div>
		</div>
	)
}

export default BookCard
