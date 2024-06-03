import React from 'react'
import './MovieDetail.css'

const MovieDetail = ({movieDetailData}) => {
    const posterPath = `https://image.tmdb.org/t/p/w500${movieDetailData.poster_path}`
    console.log(movieDetailData)
  return (
    <div className='container'>
        <img src={posterPath} className='poster'/>
        <h1 className='title'>{movieDetailData.title}</h1>
        <span className='vote_average'>{movieDetailData.vote_average}</span>
        <div className='genres'>
            {movieDetailData.genres.map((genre) => (
                <sapn className='genre'>{genre.name}</sapn>
            ))}
        </div>
        <p className='overview'>{movieDetailData.overview}</p>
    </div>
  )
}

export default MovieDetail