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
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // 비밀번호 유효성 검사 정규 표현식
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!name || !email || !password || !confirmPassword) {
      alert('모든 필드를 입력해 주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!emailRegex.test(email)) {
      alert('유효한 이메일 주소를 입력해 주세요.');
      return;
    }
  
    if (!passwordRegex.test(password)) {
      alert('비밀번호는 최소 8자 이상, 대문자, 소문자, 숫자를 포함해야 합니다.');
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