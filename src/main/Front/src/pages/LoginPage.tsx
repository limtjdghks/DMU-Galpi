import React, {JSX, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {api} from '../AxiosInstance'
import {useAuth} from '../hooks/AuthContext'

const LoginPage = (): JSX.Element => {
	const [userId, setUserId] = useState<string>()
	const [password, setPassword] = useState<string>()
	const navigate = useNavigate()
	const { refreshAuth } = useAuth()

	const handleLogin = async (e?: React.MouseEvent<HTMLButtonElement>) => {
		e?.preventDefault()
		if (!userId || !password) {
			alert('아이디와 비밀번호를 입력하세요')
			return
		}

		try {
			await api.post(
				'/api/login',
				{
					userId: userId,
					password: password,
				},
				{ withCredentials: true }
			)

			await refreshAuth()

			console.log('로그인 성공')
			navigate('/')
		} catch (e: any) {
			alert('로그인 실패')
			console.log(e)
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleLogin()
		}
	}

	return (
		<div className='flex size-full items-center justify-center'>
			<div className='h-[60vh] w-[35vw] rounded-[10%] bg-MainColor'>
				<div className='flex h-full flex-col items-center justify-center'>
					<Link className='text-[30px] font-bold text-[#78A043]' to={'/'}>
						GALPI
					</Link>
					<div className='flex flex-col items-center gap-20' id='login'>
						<label htmlFor='username'>
							<p className='text-[18px] font-bold'>아이디</p>
							<input
								id='username'
								type='text'
								autoComplete='username'
								className='mt-2 h-8 w-56 rounded-lg px-2 outline outline-2 outline-black'
								onChange={(e) => setUserId(e.target.value)}
							/>
						</label>
						<label htmlFor='password'>
							<p className='text-[18px] font-bold'>비밀번호</p>
							<input
								id='password'
								type='password'
								autoComplete='current-password'
								className='mt-2 h-8 w-56 rounded-lg px-2 outline outline-2 outline-black'
								onChange={(e) => setPassword(e.target.value)}
								onKeyDown={handleKeyDown}
							/>
						</label>
						<button className='mt-5 h-12 w-32 rounded-xl bg-[#C6FF7C] font-bold' onClick={handleLogin}>
							로그인
						</button>
					</div>
					<Link to={'/signup'}>회원가입</Link>
				</div>
			</div>
		</div>
	)
}

export default LoginPage