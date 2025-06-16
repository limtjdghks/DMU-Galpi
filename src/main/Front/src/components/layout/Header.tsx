import React, {JSX, useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../../hooks/AuthContext'

const Header = (): JSX.Element => {
	const { isAuthenticated } = useAuth()
	const [searchQuery, setSearchQuery] = useState<string>()
	const navigate = useNavigate()

	const handleSearch = (e:React.FormEvent) => {
		e.preventDefault()
		if(searchQuery?.trim() !== '') {
			navigate(`/booklist?query=${searchQuery}`)
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
			<div className="flex flex-row gap-6 items-center">
				<form onSubmit={handleSearch}>
					{/* 검색창 */}
					<input className="outline outline-2 rounded-xl w-[18vw] h-8 px-2" placeholder="책 제목을 검색하세요" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
				</form>
				{isAuthenticated ? <Link to={'/mypage'}>마이페이지</Link> : <Link to={'/login'}>로그인</Link>}</div>
		</div>
	)
}

export default Header