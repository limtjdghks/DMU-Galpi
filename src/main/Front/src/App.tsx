import './assets/styles/App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import RecordPage from './pages/RecordPage'

function App() {
	return (
		<div className='h-screen w-screen'>
			<BrowserRouter>
				<Content />
			</BrowserRouter>
		</div>
	)
}

export default App

function Content() {
	const location = useLocation()
	const hideHeader = ['/login']

	return (
		<>
			{!hideHeader.includes(location.pathname) && <Header />}
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/record' element={<RecordPage />} />
			</Routes>
		</>
	)
}
