import React from 'react'
import { useNavigate } from 'react-router-dom'
import './MovieCard.css'

const MovieCard = ({movieData}) => {
    const navigate = useNavigate()
    console.log(movieData)
    const posterPath = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`

  return (
    <div className='movieCard' onClick={() => navigate('/details')} movieData={movieData}>
        <img src={posterPath}/>
        <p>{movieData.title}</p>
        <p>{movieData.vote_average}</p>
    </div>
  )
}

export default MovieCard