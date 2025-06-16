import {JSX, useEffect, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {api} from '../AxiosInstance'

interface BookItem {
	title: string
	author: string
	publisher: string
	pubDate: string
	cover: string
	link: string
	isbn13: string
}

const BookList = (): JSX.Element => {
	const [searchParams] = useSearchParams()
	const query = searchParams.get('query') || ''
	const [books, setBooks] = useState<BookItem[]>([])
	const navigate = useNavigate()

	useEffect(() => {
		if (query.trim() === '') return

		api
			.get('/api/book/search', { params: { query } })
			.then((res) => setBooks(res.data.item || []))
			.catch((err) => console.error('도서 검색 실패:', err))
	}, [query])

	const handleClick = (id: string) => {
		navigate(`/record?id=${id}`)
	}

	return (
		<div className='mx-[10%] p-8'>
			<h2 className='mb-4 text-xl font-bold'>검색 결과: "{query}"</h2>
			<div className='grid grid-cols-1 justify-items-center gap-8 gap-x-72 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
				{books.map((book, index) => (
					<div key={index} className='w-[350px] rounded-xl border p-4 shadow hover:cursor-pointer' onClick={()=> handleClick(book.isbn13)}>
						<img src={book.cover} alt={book.title} className='mb-3 h-auto w-full' />
						<h3 className='font-semibold'>{book.title}</h3>
						<p className='text-sm text-gray-600'>
							{book.author} | {book.publisher}
						</p>
						<p className='text-sm text-gray-600'>{book.pubDate}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default BookList