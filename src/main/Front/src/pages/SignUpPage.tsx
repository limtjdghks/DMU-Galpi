import {JSX, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {api} from "../AxiosInstance";

const SignUpPage = ():JSX.Element => {
	const [name, setName] = useState<string>()
	const [userId, setUserId] = useState<string>()
	const [password, setPassword] = useState<string>()
	const navigate = useNavigate()

	const handleSignUp = async () => {
		if(!name || !userId || !password) {
			alert('정보를 전부 입력해주세요')
			return
		}

		try {
			await api.post('/api/signup', {
				userId: userId,
				password: password,
				name: name
			})
			console.log('회원가입 성공')
			navigate('/login')
		} catch(e:any) {
			alert('회원가입 실패')
			console.log(e)
		}
	}

    return(
			<div className='flex size-full items-center justify-center'>
				<div className=' min-h-[650px] h-[70vh] min-w-[400px] w-[35vw] rounded-[10%] bg-MainColor'>
					<div className='flex h-full flex-col items-center justify-center'>
						<div className='flex flex-col items-center  gap-10' id='login'>
                            <label htmlFor='name'>
                                    <p className='text-[18px] font-bold'>이름</p>
                                    <input id='name' type='text' className='mt-2 h-8 w-56 rounded-lg px-2 outline outline-2 outline-black'
									onChange={(e) => setName(e.target.value)}
									 />
                                </label>
                            <div>
                                <label htmlFor='username'>
                                    <p className='text-[18px] font-bold'>아이디</p>
                                    <input id='username' type='text' className='mt-2 h-8 w-56 rounded-lg px-2 outline outline-2 outline-black'
									onChange={(e) => setUserId(e.target.value)} />
                                </label>
                            </div>
							<label htmlFor='password'>
								<p className='text-[18px] font-bold'>비밀번호</p>
								<input id='password' type='password' className='mt-2 h-8 w-56 rounded-lg px-2 outline outline-2 outline-black' onChange={(e) => setPassword(e.target.value)} />
							</label>
                            <label htmlFor="passwordCheck">
                                <p className='text-[18px] font-bold'>비밀번호 확인</p>
								<input id='passwordCheck' type='password' className='mt-2 h-8 w-56 rounded-lg px-2 outline outline-2 outline-black' />
                            </label>
							<button type='submit' className='mt-5 h-12 w-32 rounded-xl bg-BtnColor1 font-bold' onClick={handleSignUp}>
								회원가입
							</button>
						</div>
						<Link to={'/signup'}>로그인</Link>
					</div>
				</div>
			</div>
    )
}

export default SignUpPage