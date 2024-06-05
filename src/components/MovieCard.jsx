import React from 'react'
import { useNavigate } from 'react-router-dom'
import './MovieCard.css'

const MovieCard = ({movieData}) => {
  const navigate = useNavigate()
  console.log(movieData)
  const posterPath = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
  const backdropPath = `https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`

  return (
    <div className='movieCard' onClick={() => navigate(`/${movieData.id}`)} movieData={movieData}>
        <img className='Poster' src={posterPath}/>
        <img className='Backdrop' src={backdropPath}/>
        <div className='MovieThumbInfo'>
          <h3 className='Title'>{movieData.title ? movieData.title : movieData.name}</h3>
          <p>{(Math.ceil(movieData.vote_average * 10)/10)}</p>
        </div>
    </div>
  )
}

export default MovieCard