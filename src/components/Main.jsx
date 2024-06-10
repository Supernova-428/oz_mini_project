import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from '../api/axios'
import requests from '../api/requests'
import MovieCard from './MovieCard'

const Main = () => {

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

  return (
    <Container>
        {movieList.map((movie, i) => <MovieCard key={i} movieData={movie} />)}
    </Container>
  )
}

export default Main

const Container = styled.div`
  margin-top: 70px;
  padding: 10px 0 10px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`