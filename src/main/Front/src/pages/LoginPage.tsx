import {JSX} from "react";

const LoginPage = ():JSX.Element => {
    return (
        <div className='size-full flex items-center justify-center'>
            <div className='w-[25vw] h-[60vh] bg-MainColor rounded-[10%]'>
                <div className='flex h-full justify-center items-center'>
                    <form className='flex flex-col gap-20 items-center' id='login'>
                        <label htmlFor='username'>
                            <p className='text-[18px] font-bold'>아이디</p>
                            <input id='username' type='text' autoComplete='username'
                            className='w-56 h-8 mt-2 rounded-lg outline outline-2 outline-black px-2'
                            />
                        </label>
                        <label htmlFor='password'>
                            <p className='text-[18px] font-bold'>비밀번호</p>
                            <input id='password' type='password' autoComplete='current-password'
                                   className='w-56 h-8 mt-2 rounded-lg outline outline-2 outline-black px-2'
                            />
                        </label>
                        <button type='submit' className='bg-[#C6FF7C] w-32 h-12 mt-5 rounded-xl font-bold'>로그인</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage