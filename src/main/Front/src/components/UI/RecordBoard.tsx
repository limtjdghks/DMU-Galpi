import { JSX } from 'react'

const Record = (): JSX.Element => {

	return (
		<div className='flex min-h-[10rem] w-[90%] flex-col rounded-2xl bg-gray-100 px-7 pb-2'>
			<p className='pt-6'>ㅡㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓ.... 예</p>
			<div className='ml-auto mt-auto flex items-center gap-3'>
				<p className='text-[12px] text-gray-400'>작성 날짜 2025-06-01</p>
				<button className='h-8 w-24 rounded-xl bg-gray-300'>수정하기</button>
				<button className='h-8 w-24 rounded-xl bg-gray-300'>삭제하기</button>
			</div>
		</div>
	)
}

export default Record
