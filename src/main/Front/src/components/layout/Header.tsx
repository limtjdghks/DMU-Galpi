import {JSX} from "react";

const Header = ():JSX.Element => {
    return (
			<div className='flex justify-between px-20 shadow-2xl h-20 items-center bg-white z-10 relative'>
				<div className='flex flex-row items-center gap-8 '>
					<p className='text-[#78A043] text-[30px] font-bold'>GALPI</p>
					<p>나의 기록</p>
				</div>
				<div>
					<p>로그인</p>
				</div>
			</div>
		)
}

export default Header