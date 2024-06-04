import React from 'react'
import './SignUp.css'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const navigate = useNavigate()

  return (
    <div>
        <form className='SignUpForm'>
            <h2>SignUp</h2>
            <input className='NameInput' type='text' placeholder='name'/>
            <input className='EmailInput' type='email' placeholder='email'/>
            <input className='PasswordInput' type='password' placeholder='password'/>
            <input className='PasswordInput' type='password' placeholder='password check'/>
            <button className='SignUpBtn' type='submit'>가입하기</button>
            <button className='SignInBtn' onClick={()=>navigate('/signIn')}>취소</button>
        </form>
    </div>
  )
}

export default Signup