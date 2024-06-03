import { useEffect, useState } from 'react'
import './App.css'
import movieListData from './data/movieListData.json'
import movieDetailData from './data/movieDetailData.json'
import { Route, Routes } from 'react-router-dom'
import MovieCard from './components/MovieCard'
import MovieDetail from './components/MovieDetail'
import styled from 'styled-components'

function App() {

  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    setMovieList(movieListData.results)
  }, [])
  console.log(movieList)

  return (
    <>
      <Routes>
        <Route index element={
          <Container>
            {movieList.map((movie) => <MovieCard key={movie.id} movieData={movie} />)}
          </Container>
        } />
        <Route path='/details' element={<MovieDetail movieDetailData={movieDetailData} />}/>
      </Routes>
    </>
  )
}

export default App

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
`