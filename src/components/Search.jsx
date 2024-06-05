import axios from '../api/axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {useDebounce} from '../hooks/useDebounce'
import styled from 'styled-components'
import MovieCard from './MovieCard'

const Search = () => {

    const [searchResults, setSearchResults] = useState([])

    const useQuery = () => {
    return new URLSearchParams(useLocation().search)
    }

    let query = useQuery()
    const searchTerm = query.get('q')
    const debouncedSearchTerm = useDebounce(query.get('q'), 500)

    useEffect(() => {
    if(searchTerm){
        fetchSearchMovie(debouncedSearchTerm)
    }
    }, [debouncedSearchTerm])

    const fetchSearchMovie = async(searchTerm) => {
    try{
        const response = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`)
        console.log(response)
        setSearchResults(response.data.results)
    }catch(error){
        console.error(error)
    }
    }

    if (searchResults.length > 0) { 
    return (
        <Container>
            {searchResults.filter(movie => movie.media_type === 'movie').map((movie) => <MovieCard movieData={movie} />)}
        </Container>
    )
    }else{
    return(
        <section className="no-results">
        <div className="no-results_text">
            <p>
            찾고자 하는 검색어 {searchTerm} 에 맞는 영화가 없습니다.
            </p>
        </div>
        </section>
    )
    }
}

export default Search

const Container = styled.div`
  margin-top: 70px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`