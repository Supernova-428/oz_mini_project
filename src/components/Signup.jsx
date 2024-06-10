import React, { useState } from 'react'
import './SignUp.css'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import app from '../firebase';

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const auth = getAuth(app)
  const navigate = useNavigate()

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !password || !confirmPassword) {
      alert('모든 필드를 입력해 주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential
      updateProfile(user, {
        displayName: name
      });
      navigate('/')
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
  }

  return (
    <div>
        <form className='SignUpForm' onSubmit={handleOnSubmit}>
            <h2>SignUp</h2>
            <input className='NameInput' type='text' placeholder='이름' value={name} onChange={(e) => setName(e.target.value)}/>
            <input className='EmailInput' type='email' placeholder='이메일' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input className='PasswordInput' type='password' placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input className='PasswordInput' type='password' placeholder='비밀번호 확인' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <button className='Btn' type='submit'>가입하기</button>
            <button className='Btn' onClick={()=>navigate('/')}>취소</button>
        </form>
    </div>
  )
}

export default Signup