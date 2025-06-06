import {JSX} from "react";

const LoginPage = ():JSX.Element => {
    return (
			<div className='flex size-full items-center justify-center'>
				<div className='h-[60vh] w-[35vw] rounded-[10%] bg-MainColor'>
					<div className='flex h-full items-center justify-center'>
						<form className='flex flex-col items-center gap-20' id='login'>
							<label htmlFor='username'>
								<p className='text-[18px] font-bold'>아이디</p>
								<input id='username' type='text' autoComplete='username' className='mt-2 h-8 w-56 rounded-lg px-2 outline outline-2 outline-black' />
							</label>
							<label htmlFor='password'>
								<p className='text-[18px] font-bold'>비밀번호</p>
								<input id='password' type='password' autoComplete='current-password' className='mt-2 h-8 w-56 rounded-lg px-2 outline outline-2 outline-black' />
							</label>
							<button type='submit' className='mt-5 h-12 w-32 rounded-xl bg-[#C6FF7C] font-bold'>
								로그인
							</button>
						</form>
					</div>
				</div>
			</div>
		)
}

export default LoginPage