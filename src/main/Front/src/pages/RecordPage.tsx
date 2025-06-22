import {JSX, useEffect, useState} from 'react'
import Book from '../components/UI/Book'
import RecordBoard from '../components/UI/RecordBoard'
import {useDetailStore, useModalOpenStore} from '../store/Store'
import Modal from '../components/layout/Modal'
import Recording from '../components/UI/Recording'
import {useSearchParams} from 'react-router-dom'
import {api} from '../AxiosInstance'

interface Report {
	id: number
	bookId: string
	bookName: string
	tag: string
	content: string
	createdAt?: string
  }

  const RecordPage = (): JSX.Element => {
	const { modalOpen, setModalOpen } = useModalOpenStore()
	const [searchParams] = useSearchParams()
	const id = searchParams.get('id')
	const { book, setBook } = useDetailStore()
	const [report, setReport] = useState<Report[]>([])
	const [editingReport, setEditingReport] = useState<Report | null>(null)

	useEffect(() => {
	  if (!id) return

	  const fetchBookDetail = async () => {
		try {
		  const res = await api.get(`/api/book/info/${id}`)
		  const item = res.data.item?.[0]
		  if (item) {
			const parsedTag = extractSecondCategory(item.categoryName)
			setBook({
			  bookId: id,
			  title: item.title,
			  author: item.author,
			  publisher: item.publisher,
			  pubDate: item.pubDate,
			  description: item.description,
			  cover: item.cover,
			  categoryName: item.categoryName,
			  tag: parsedTag || '',
			})
		  }
		} catch (e: any) {
		  alert('에러')
		  console.log(e)
		}
	  }

	  const loadRecord = async () => {
		try {
		  const res = await api.get(`/api/report/${id}`)
		  setReport(res.data)
		} catch (e: any) {
		  console.log(e)
		  alert('기록 불러오기 실패')
		}
	  }

	  fetchBookDetail()
	  loadRecord()
	}, [id])

	const extractSecondCategory = (categoryName: string): string | null => {
	  if (!categoryName) return null
	  const parts = categoryName.split('>')
	  return parts.length >= 2 ? parts[1].trim() : null
	}

	return (
	  <div className='w-full px-[10%]'>
		<div className='mt-20 flex flex-row'>
		  <Book imgSrc={book?.cover} />
		  <div className='ml-32 flex flex-col gap-12'>
			<div className='mt-3 flex space-x-96'>
			  <p className='text-[20px]'>별점 ★★★★★</p>
			  <p className='text-[20px]'>읽은 기간</p>
			</div>
			<div>
			  <p className='text-[20px]'>{book?.title}</p>
			  <p className='text-gray-400'>
				저자 {book?.author} | 출판사 {book?.publisher} | 장르 {book?.tag} |
			  </p>
			</div>
			<div>
			  <p className='text-gray-400'>{book?.description}</p>
			</div>
		  </div>
		</div>

		<div className='mt-20 w-full border-t-2 border-black' />

		<div className='mt-8'>
		  <div className='flex justify-between'>
			<p className='text-[24px]'>나의 기록</p>
			<button
			  className='rounded-lg bg-MainColor px-8 py-1'
			  onClick={() => {
				setEditingReport(null)
				setModalOpen(true)
			  }}
			>
			  작성하기
			</button>
		  </div>
		  <div className='mt-12 flex justify-center'>
			<RecordBoard report={report} onEdit={(report) => {
			  setEditingReport(report)
			  setModalOpen(true)
			}} />
		  </div>
		</div>

		{modalOpen && (
		  <Modal>
			<Recording
			  mode={editingReport ? 'edit' : 'create'}
			  report={editingReport || undefined}
			/>
		  </Modal>
		)}
	  </div>
	)
  }

  export default RecordPage
