import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Nav.css'
import { IoSearch, IoPersonSharp, IoPersonAddSharp, IoHappy } from "react-icons/io5";
import useOnClickOutside from '../hooks/useOnClickOutside';
import { getAuth, reload, signOut } from 'firebase/auth';
import app from '../firebase';
import { useSelector, useDispatch } from 'react-redux';

const Nav = () => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [showInput, setShowInput] = useState(false)
  const {pathname} = useLocation()
  const auth = getAuth(app)
  // const [userData, setUserData] = useState({})
  const dispatch = useDispatch()
  // useEffect(() => {
  //   setUserData(googleUserData)
  // }, [auth, navigate, googleUserData])
  const userData = useSelector((state)=>state)

  useEffect(() => {
    dispatch({type: 'SET_DATA', payload: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : userData})
  }, [])
  

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

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch({type: 'SET_DATA', payload: {}})
      localStorage.removeItem('userData')
      location.reload()
    }).catch((error)=>{
      alert(error.message)
    })
  }

  return (
    <div className='NavWrapper'>
      <div className='HomeBtn' onClick={() => navigate('/')}>
        Home
      </div>
      <div className='Sign'>
        {pathname === '/signIn' ?
        <>
        <p className='SignUp' onClick={() => navigate('signUp')}>회원가입</p>
        <p className='SignUpIcon' onClick={() => navigate('signUp')}><IoPersonAddSharp /></p>
        </>
        : pathname === '/signUp' ?
        <>
        <p className='SignInIcon' onClick={() => navigate('/signIn')}><IoPersonSharp /></p>
        <p className='SignIn' onClick={() => navigate('/signIn')}>로그인</p>
        </>
        : userData.displayName || userData.email ?
        <>
        <input ref={searchInputRef} className={`Input ${showInput ? 'Show' : 'Hide'}`} type='text' placeholder='search' value={searchValue} onChange={handleChange}/>
        <div className={`InputIcon ${!showInput ? 'Show' : 'Hide'}`} onClick={toggleInput}><IoSearch /></div>
        <div className='UserThumbnail'>
          {userData.photoURL ?
          <img className='UserImg' src={userData.photoURL ? userData.photoURL : IoHappy} alt={userData.displayName}/>
          :
          <IoHappy size={48}/>
          }
          <div className='DropDown'>
            <p className='Drop_MyPage'>마이페이지</p>
            <p className='Drop_SignOut' onClick={handleSignOut}>로그아웃</p>
          </div>
        </div>
        </>
        :
        <>
        <input ref={searchInputRef} className={`Input ${showInput ? 'Show' : 'Hide'}`} type='text' placeholder='search' value={searchValue} onChange={handleChange}/>
        <div className={`InputIcon ${!showInput ? 'Show' : 'Hide'}`} onClick={toggleInput}><IoSearch /></div>
        <p className='SignIn' onClick={() => navigate('/signIn')}>로그인</p>
        <p className='SignInIcon' onClick={() => navigate('/signIn')}><IoPersonSharp /></p>
        <p className='SignUp' onClick={() => navigate('signUp')}>회원가입</p>
        <p className='SignUpIcon' onClick={() => navigate('signUp')}><IoPersonAddSharp /></p>
        </>
        }

      </div>
    </div>
  )
}

export default Nav