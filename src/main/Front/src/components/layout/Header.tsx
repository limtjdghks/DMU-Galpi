import React, {JSX, useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../../hooks/AuthContext'
import {api} from '../../AxiosInstance'

const Header = (): JSX.Element => {
	const { isAuthenticated, username } = useAuth()
	const [searchQuery, setSearchQuery] = useState<string>()
	const navigate = useNavigate()

	const handleSearch = (e:React.FormEvent) => {
		e.preventDefault()
		if(searchQuery?.trim() !== '') {
			navigate(`/booklist?query=${searchQuery}`)
		}
	}

	const handleLogout = async () => {
		try {
			await api.post('/api/logout', null, { withCredentials: true })

			window.location.href = '/'
			alert('로그아웃 되었습니다.')
		} catch (error) {
			console.error('로그아웃 실패', error)
			alert('로그아웃 중 오류가 발생했습니다.')
		}
	}

	return (
		<div className='relative z-10 flex h-20 items-center justify-between bg-white px-20 shadow-2xl'>
			<div className='flex flex-row items-center gap-8'>
				<Link className='text-[30px] font-bold text-[#78A043]' to={'/'}>
					GALPI
				</Link>
				<p>나의 기록</p>
			</div>
			<div className='flex flex-row items-center gap-6'>
				<form onSubmit={handleSearch}>
					{/* 검색창 */}
					<input
						className='h-8 w-[18vw] rounded-xl px-2 outline outline-2'
						placeholder='책 제목을 검색하세요'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}></input>
				</form>
				{isAuthenticated ? (
					<>
						<p>{username}님 환영합니다</p>
						<button onClick={handleLogout} className='rounded bg-red-400 px-4 py-2 text-white'>
							로그아웃
						</button>
					</>
				) : (
					<Link to={'/login'}>로그인</Link>
				)}
			</div>
		</div>
	)
}

export default Header