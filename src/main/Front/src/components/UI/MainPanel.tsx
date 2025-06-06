import React, { JSX } from 'react'

interface props {
	children: React.ReactNode
	width: string
	height: string
	title: string
}

const MainPanel = ({ children, width, height, title }: props): JSX.Element => {
	return (
		<div className='rounded-xl bg-white p-4 shadow-2xl' style={{ width, height }}>
			<p className='text-[18px] font-bold'>{title}</p>
			<div className='mt-4'>{children}</div>
		</div>
	)
}

export default MainPanel
