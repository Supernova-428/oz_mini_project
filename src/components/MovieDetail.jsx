import React, { useEffect, useState } from 'react'
import './MovieDetail.css'
import axios from '../api/axios'
import { useParams } from 'react-router-dom'

const MovieDetail = () => {
  const {movieId} = useParams()
  const [movie, setMovie] = useState(null)
  
  useEffect(() => {
    async function fetchData(){
      const response = await axios.get(`/movie/${movieId}`)
      setMovie(response.data)
    }
    fetchData()
  }, [movieId])
  // const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  console.log(movie)
  if (!movie) return null

  console.log(movie)
  return (
    <div className='container'>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className='poster'/>
        <h1 className='title'>{movie.title}</h1>
        <span className='vote_average'>{movie.vote_average}</span>
        <div className='genres'>
            {movie.genres.map((genre) => (
                <sapn className='genre' key={genre.id}>{genre.name}</sapn>
            ))}
        </div>
        <p className='overview'>{movie.overview}</p>
    </div>
  )
}

export default MovieDetail