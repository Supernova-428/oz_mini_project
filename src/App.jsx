import './App.css'
import movieListData from './data/movieListData.json'
import movieDetailData from './data/movieDetailData.json'
import { Outlet, Route, Routes } from 'react-router-dom'
import MovieDetail from './components/MovieDetail'
import Nav from './components/Nav'
import Signup from './components/Signup'
import Login from './components/Login'
import Search from './components/Search'
import Main from './components/Main'

function App() {

  const Layout = () => {
    return (
      <>
      <Nav />
      <Outlet />
      </>
    )
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='signIn' element={<Login />} />
          <Route path='signUp' element={<Signup />} />
          <Route path=':movieId' element={<MovieDetail />} />
          <Route path='search' element={<Search />} />
        </Route>
      </Routes>
    </>
  )
}

export default App