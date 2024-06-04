import { useEffect, useState } from 'react'
import './App.css'
import movieListData from './data/movieListData.json'
import movieDetailData from './data/movieDetailData.json'
import { Outlet, Route, Routes } from 'react-router-dom'
import MovieCard from './components/MovieCard'
import MovieDetail from './components/MovieDetail'
import styled from 'styled-components'
import Nav from './components/Nav'
import Signup from './components/Signup'
import Login from './components/Login'
import axios from './api/axios'
import requests from './api/requests'
function App() {

  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get(requests.fetchPopular)
      setMovieList(response.data.results)
    }
    loadData()
  },[requests.fetchPopular])

  // useEffect(() => {
  //   setMovieList(movieListData.results)
  // }, [])
  console.log(movieList)

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
          <Route path='signIn' element={<Login />} />
          <Route path='signUp' element={<Signup />} />
          <Route index element={
            <Container>
              {movieList.map((movie, i) => <MovieCard key={i} movieData={movie} />)}
            </Container>
          } />
          <Route path=':movieId' element={<MovieDetail />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

const Container = styled.div`
  margin-top: 70px;
  padding: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`