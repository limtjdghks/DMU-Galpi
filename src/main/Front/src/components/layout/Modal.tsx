import React, { JSX } from 'react'
import { useModalOpenStore } from '../../store/Store'

interface props {
	children: React.ReactNode
}

const Modal = ({ children}: props): JSX.Element => {
    const {setModalOpen} = useModalOpenStore()

	const handleOverlayClick = () => {
		setModalOpen(false)
	}

	const handleContentClick = (e: React.MouseEvent) => {
		e.stopPropagation()
	}

	return (
		<div className='fixed inset-0 z-[1000] flex h-full w-full items-center justify-center bg-gray-950 bg-opacity-40' onClick={handleOverlayClick}>
			<div className='z-[1001] flex items-center justify-center' onClick={handleContentClick}>
				{children}
			</div>
		</div>
	)
}

export default Modal
