export interface BookState {
	id: number
	title: string
	tag: string
	setTitle: (title: string) => void
}

export interface ModalState {
	modalOpen: boolean
	setModalOpen: (state: boolean) => void
}

interface BookDetail {
    bookId: string
	title: string
	author: string
	publisher: string
	pubDate: string
	description: string
	cover: string
	categoryName: string
	tag: string
}

export interface DetailState {
	book: BookDetail | null
	setBook: (book: BookDetail) => void
	setDetail: (partial: Partial<BookDetail>) => void
}

export namespace Stat {
	interface GenreData {
		name: string
		value: number
	}

	interface MonthlyData {
		month: string
		count: number
	}

	export interface StatState {
		genreStats: GenreData[]
		monthlyStats: MonthlyData[]
		setGenreStats: (data: GenreData[]) => void
		setMonthlyStats: (data: MonthlyData[]) => void
	}
}

export namespace BestSeller {
	interface BestSellerBook {
		title: string
		tag: string
		cover: string
		isbn13: string
	}

	export interface BestSellerState {
		data: BestSellerBook | null
		setData: (data:BestSellerBook) => void
	}
}

