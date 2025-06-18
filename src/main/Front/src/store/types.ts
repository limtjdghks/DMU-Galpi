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