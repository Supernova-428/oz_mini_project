import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Nav.css'
import { IoSearch, IoPersonSharp, IoPersonAddSharp } from "react-icons/io5";
import useOnClickOutside from '../hooks/useOnClickOutside';

const Nav = () => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [showInput, setShowInput] = useState(false)

  const handleChange = (e) => {
    setSearchValue(e.target.value)
    navigate(`/search?q=${e.target.value}`)
  }
  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const searchInputRef = useRef(null)
  useOnClickOutside(searchInputRef, () => {
    if (innerWidth > 426) {
      setShowInput(true)
    }else{
      setShowInput(false)
    }
  })

  return (
    <div className='NavWrapper'>
      <div className='HomeBtn' onClick={() => navigate('/')}>
        Home
      </div>
      <div className='Sign'>
        <input ref={searchInputRef} className={`Input ${showInput ? 'Show' : 'Hide'}`} type='text' placeholder='search' value={searchValue} onChange={handleChange}/>
        <div className={`InputIcon ${!showInput ? 'Show' : 'Hide'}`} onClick={toggleInput}><IoSearch /></div>
        <p className='SignInIcon' onClick={() => navigate('signIn')}><IoPersonSharp /></p>
        <p className='SignUpIcon' onClick={() => navigate('signUp')}><IoPersonAddSharp /></p>
        <p className='SignIn' onClick={() => navigate('signIn')}>로그인</p>
        <p className='SignUp' onClick={() => navigate('signUp')}>회원가입</p>

      </div>
    </div>
  )
}

export default Nav
