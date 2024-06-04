import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Nav.css'

const Nav = () => {
    const navigate = useNavigate()
  return (
    <div className='NavWrapper'>
        <div className='HomeBtn' onClick={() => navigate('/')}>
            Home
        </div>
        <input className='Input' type='text' placeholder='search'/>
        <div className='Sign'>
            <span className='SignIn' onClick={() => navigate('signIn')}>로그인</span>
            <span className='SignUp' onClick={() => navigate('signUp')}>회원가입</span>
        </div>
    </div>
  )
}

export default Nav
