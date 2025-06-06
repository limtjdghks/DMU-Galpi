import { create } from 'zustand'
import { BookState, ModalState } from './types'

export const useBookStore = create<BookState>()((set) => ({
	id: 0,
	title: '',
	tag: '',
	setTitle: (newTitle) => {
		set(() => ({ title: newTitle }))
	},
}))

export const useModalOpenStore = create<ModalState>()((set) => ({
	modalOpen: false,
	setModalOpen: (state) => {
		set(() => ({ modalOpen: state }))
	},
}))
