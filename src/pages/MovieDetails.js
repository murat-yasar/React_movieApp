import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import TrailerSection from '../components/TrailerSection';

const MovieDetails = () => {
  const [videoKey, setVideoKey] = useState();
  const [movieDetails, setMovieDetails] = useState();
  const { movieId } = useParams();

  const baseUrl = "https://api.themoviedb.org/3";
  const imgUrl = "https://image.tmdb.org/t/p/w1280";
  const movieDetailsUrl = `${baseUrl}/movie/${movieId}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;
  const videoUrl = `${baseUrl}/movie/${movieId}/videos?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;

  useEffect(() => {
    axios.get(movieDetailsUrl).then((res) => setMovieDetails(res.data));

    axios.get(videoUrl).then((res) => setVideoKey(res.data.results[0].key)); // Gets the key of the first movie
  }, [movieDetails, videoKey, movieId]);

  return (
    <div className="py-5 page" style={{ backgroundColor: "#555" }}>
      <div className="container">
        <div className="card mb-3 bg-dark text-light shadow-lg">
          <div className="row">

            {/* MOVIE-DETAILS */}
            <div className="col-md-4">
              <img src={imgUrl + movieDetails?.poster_path} className="img-fluid rounded-start" alt="movie poster" />

              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <b>Release Date: </b> <span>{movieDetails?.release_date}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <b>Rate: </b> <span>{(movieDetails?.vote_average)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <b>Total Vote: </b> <span>{movieDetails?.vote_count}</span>
                </li>
                <li className="list-group-item text-center">
                  <Link to={-1} className='btn btn-primary'>Go Back</Link>
                </li>
              </ul>
            </div>

            {/* MOVIE-TRAILER */}
            <div className="col-md-8 d-flex flex-column">
              <div className="card-body">
                <h3 className="text-center">{movieDetails?.title}</h3>
                {videoKey && <TrailerSection videoKey={videoKey} />} {/* If videoKey exist show the trailer */}
                {/* <h5 className="card-title mt-4" >{movieDetails?.title}</h5> */}
                <h5 className="card-title mt-4" >overview</h5>
                <p className="card-text">{movieDetails?.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
