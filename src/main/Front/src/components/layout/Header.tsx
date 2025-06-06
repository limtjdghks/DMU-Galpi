import {JSX} from "react";
import { Link } from 'react-router-dom'

const Header = (): JSX.Element => {
	return (
		<div className='relative z-10 flex h-20 items-center justify-between bg-white px-20 shadow-2xl'>
			<div className='flex flex-row items-center gap-8'>
				<Link className='text-[30px] font-bold text-[#78A043]' to={'/'}>
					GALPI
				</Link>
				<p>나의 기록</p>
			</div>
			<div>
				<Link to={'/login'}>로그인</Link>
			</div>
		</div>
	)
}

export default Header