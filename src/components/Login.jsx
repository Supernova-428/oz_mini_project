import React from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

  return (
    <div>
        <form className='SignInForm'>
            <h2>LogIn</h2>
            <input className='EmailInput' type='email' placeholder='email'/>
            <input className='PasswordInput' type='password' placeholder='password'/>
            <button className='SignInBtn' type='submit'>로그인</button>
            <button className='ToSignUpBtn' onClick={()=>navigate('/signUp')}>회원가입</button>
        </form>
    </div>
  )
}

export default Login