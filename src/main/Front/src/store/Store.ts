import {create} from 'zustand'
import type {BestSeller, Stat} from './types'
import {BookState, DetailState, ModalState} from './types'

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

export const useDetailStore = create<DetailState>((set) => ({
	book: null,
	setBook: (book) => set({ book }),
	setDetail: (partial) =>
		set((state) => ({
			book: state.book ? { ...state.book, ...partial } : state.book,
		})),
}))

export const useStatStore = create<Stat.StatState>((set) => ({
	genreStats: [],
	monthlyStats: [],
	setGenreStats: (data) => set({ genreStats: data }),
	setMonthlyStats: (data) => set({ monthlyStats: data }),
}))

export const useBestSellerStore = create<BestSeller.BestSellerState>((set) => ({
	data: null,
	setData: (data) => set({ data }),
}))