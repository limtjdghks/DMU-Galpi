import {JSX} from "react";
import {Link} from 'react-router-dom'
import {useAuth} from '../../hooks/AuthContext'

const Header = (): JSX.Element => {
	const { isAuthenticated } = useAuth()
	return (
		<div className='relative z-10 flex h-20 items-center justify-between bg-white px-20 shadow-2xl'>
			<div className='flex flex-row items-center gap-8'>
				<Link className='text-[30px] font-bold text-[#78A043]' to={'/'}>
					GALPI
				</Link>
				<p>나의 기록</p>
			</div>
			<div className="flex flex-row gap-6 items-center">
				<div>
					{/* 검색창 */}
					<input className="outline outline-2 rounded-xl w-[18vw] h-8 px-2"></input>
				</div>
				{isAuthenticated ? <Link to={'/mypage'}>마이페이지</Link> : <Link to={'/login'}>로그인</Link>}</div>
		</div>
	)
}

export default Header