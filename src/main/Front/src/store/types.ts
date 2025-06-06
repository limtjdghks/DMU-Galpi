export interface BookState {
    id: number
    title: string
    tag: string
    setTitle: (title:string) => void
}

export interface ModalState {
    modalOpen: boolean
    setModalOpen: (state:boolean) => void
}