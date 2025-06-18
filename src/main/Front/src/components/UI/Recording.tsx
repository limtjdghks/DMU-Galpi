import { JSX, useState } from 'react'
import { useDetailStore, useModalOpenStore } from '../../store/Store'
import { api } from '../../AxiosInstance'

const Recording = (): JSX.Element => {
	const setModalOpen = useModalOpenStore((state) => state.setModalOpen)
	const {book} = useDetailStore()
	const [content, setContent] = useState<string>()

	const handleCreate = async () => {
		try {
			api.post('/api/report',{
				bookId: book?.bookId,
				bookName: book?.title,
				tag: book?.tag,
				content: content,
			})
			alert('게시글 작성 성공')
			setModalOpen(false)
		} catch(e:any) {
			alert('게시글 작성 에러')
			console.log(e)
		}
	}

	return (
		<div className='h-[60vh] w-[60vw] max-w-6xl rounded-2xl bg-white p-10'>
			<div>
				{/*제목 및 저자*/}
				<p className='text-[28px]'>{book?.title}</p>
				<p className='text-gray-400'>저자 {book?.author} | 장르 {book?.tag}</p>
			</div>
			<div className='mt-3 h-[65%]'>
				{/*독후감 입력*/}
				<textarea className='h-full w-full rounded-xl bg-gray-200 p-4' onChange={(e) => setContent(e.target.value)}></textarea>
			</div>
			<div className='flex justify-center gap-12'>
				{/*작성 및 취소 버튼*/}
				<button className='mt-5 h-10 w-32 rounded-xl bg-[#C6FF7C] font-bold' onClick={handleCreate}>작성 하기</button>
				<button className='mt-5 h-10 w-32 rounded-xl bg-gray-200 font-bold' onClick={() => setModalOpen(false)}>
					취소 하기
				</button>
			</div>
		</div>
	)
}

export default Recording
