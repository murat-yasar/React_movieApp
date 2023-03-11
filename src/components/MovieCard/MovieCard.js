import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import classes from './MovieCard.module.css'
import { AuthContext } from '../../context/AuthContext'


const imgUrl = 'https://image.tmdb.org/t/p/w1280/';

const MovieCard = (props) => {
  const navigate = useNavigate()
  const {currentUser} = useContext(AuthContext)
  const {id, title, overview, poster_path, vote_average} = props.movie;

  const showDetails = (id) => {
    currentUser ? navigate(`/details/${id}`) : 
    alert('Please login to see the movie details!');
  }

  const setVoteColor = (vote) => {
    let color = '';
    vote >= 8 ? color = 'lime' : 
    vote >= 7 ? color = 'gold' : 
    vote >= 6 ? color = 'orange' : 
    color = 'red';

    return color;
  }

  return (
    <div className={classes.movie} onClick={() => showDetails(id)}>

      {/* // IMAGE */}
      <img src={`${imgUrl}${poster_path}`} alt={title} />

      {/* TITLE & VOTE */}
      <div className='text-center p-2 text-white' style={{borderTop:'1px solid white'}}>
        <h5>{title}</h5>
        {currentUser && <span 
          className={classes.vote} 
          style={{backgroundColor: setVoteColor(vote_average)}}
        >{vote_average}</span>}
      </div>

      {/* OVERVIEW */}
      <div className={classes.overview}>
        <h2>overview</h2>
        <h5>{title}</h5>
        <p>{overview}</p>
      </div>

    </div>
  )
}

export default MovieCard