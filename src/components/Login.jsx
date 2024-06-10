import React, { useEffect, useState } from 'react'
import './Login.css'
import { useLocation, useNavigate } from 'react-router-dom'
import {getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'
import app from '../firebase'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const {pathname} = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const setStoreUserData = (data) => {
    dispatch({type: 'SET_DATA', payload: data})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      setStoreUserData(user)
      localStorage.setItem('userData',JSON.stringify(user))
      navigate('/')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  const handleAuth = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result)
      // setGoogleUserData(result.user)
      setStoreUserData(result.user)
      localStorage.setItem('userData',JSON.stringify(result.user))
      navigate('/')
    })
    .catch((error) => {
      alert(error.message)
    })
  }
  console.log(useSelector((state) => state))

  return (
    <div>
        <form className='SignInForm' onSubmit={handleSubmit}>
            <h2>LogIn</h2>
            <input className='EmailInput' type='email' placeholder='이메일' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input className='PasswordInput' type='password' placeholder='비밀번호' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className='Btn' type='submit'>로그인</button>
            <button className='Btn' type='button' onClick={handleAuth}>구글계정으로 로그인</button>
            <button className='Btn' type='button' onClick={()=>navigate('/signUp')}>회원가입</button>
        </form>
    </div>
  )
}

export default Login