import { JSX } from "react";
import { Link } from "react-router-dom";

const SignUpPage = ():JSX.Element => {
    return(
			<div className='flex size-full items-center justify-center'>
				<div className=' min-h-[650px] h-[70vh] min-w-[400px] w-[35vw] rounded-[10%] bg-MainColor'>
					<div className='flex h-full flex-col items-center justify-center'>
						<form className='flex flex-col items-center  gap-10' id='login'>
                            <label htmlFor='name'>
                                    <p className='text-[18px] font-bold'>이름</p>
                                    <input id='name' type='text' className='mt-2 h-8 w-56 rounded-lg px-2 outline outline-2 outline-black' />
                                </label>
                            <div>
                                <label htmlFor='username'>
                                    <p className='text-[18px] font-bold'>아이디</p>
                                    <input id='username' type='text' className='mt-2 h-8 w-56 rounded-lg px-2 outline outline-2 outline-black' />
                                </label>
                                <button className="bg-BtnColor1 w-20 h-10 rounded-lg ml-4"> 중복 확인 </button>
                            </div>
							<label htmlFor='password'>
								<p className='text-[18px] font-bold'>비밀번호</p>
								<input id='password' type='password' className='mt-2 h-8 w-56 rounded-lg px-2 outline outline-2 outline-black' />
							</label>
                            <label htmlFor="passwordCheck">
                                <p className='text-[18px] font-bold'>비밀번호 확인</p>
								<input id='passwordCheck' type='password' className='mt-2 h-8 w-56 rounded-lg px-2 outline outline-2 outline-black' />
                            </label>
							<button type='submit' className='mt-5 h-12 w-32 rounded-xl bg-BtnColor1 font-bold'>
								회원가입
							</button>
						</form>
						<Link to={'/signup'}>로그인</Link>
					</div>
				</div>
			</div>
    )
}

export default SignUpPage