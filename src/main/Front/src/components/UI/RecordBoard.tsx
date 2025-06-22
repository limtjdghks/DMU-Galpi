import {JSX} from 'react'
import {api} from '../../AxiosInstance'
import {useModalOpenStore} from '../../store/Store'

interface Report {
	id: number
	bookId: string
	bookName: string
	tag: string
	content: string
	createdAt?: string
}

interface props {
	report: Report[]
	onEdit: (report: Report) => void
}

const RecordBoard = ({ report, onEdit }: props): JSX.Element => {
	const setModalOpen = useModalOpenStore((state) => state.setModalOpen)

	if (!report.length) {
		return <p>작성된 독후감이 없습니다</p>
	}

	const handleDelete = async (id: number) => {
		try {
			await api.delete(`/api/report/delete/${id}`)
			alert('독후감이 삭제되었습니다.')
			window.location.reload()
		} catch (e: any) {
			alert('삭제 실패')
			console.log(e)
		}
	}

	return (
		<div className='flex w-full flex-col items-center justify-center gap-6'>
			{report.map((report) => (
				<div key={report.id} className='flex min-h-[10rem] w-[90%] flex-col rounded-2xl bg-gray-100 px-7 pb-2'>
					<p className='pt-6'>{report.content}</p>
					<div className='ml-auto mt-auto flex items-center gap-3'>
						<p className='text-[12px] text-gray-400'>작성 날짜 {report.createdAt?.split('T')[0]}</p>
						<button
							className='h-8 w-24 rounded-xl bg-gray-300'
							onClick={() => {
								onEdit(report)
								setModalOpen(true)
							}}>
							수정하기
						</button>
						<button className='h-8 w-24 rounded-xl bg-gray-300' onClick={() => handleDelete(report.id)}>
							삭제하기
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default RecordBoard