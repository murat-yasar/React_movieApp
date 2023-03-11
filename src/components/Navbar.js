import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { logout } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { MoviesContext } from "../context/MoviesContext";

const baseUrl = "https://api.themoviedb.org/3";
const searchUrl = `${baseUrl}/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=`;

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext); // import data of the user
  const { movies, setMovies } = useContext(MoviesContext); // import data of the movies
  const [search, setSearch] = useState("");

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  const searchHandler = async () => { // async => it requires a "request" from the server
    try {
      const res = await axios.get(`${searchUrl}${search}`);
      setMovies(res.data.results)
    } catch (err) {
      console.log(err);
    }
    
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top navbar-dark"
      style={{ backgroundColor: "#070707" }}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <h4 className="text-danger">My Movie App</h4>
        </Link>

        {/* USER-NAME */}
        <h4 className="text-capitilize d-inline-block text-info mx/2">
          {currentUser?.displayName}{" "} {/* Show the user name, if it's logged in */}
        </h4>

        <div className="d-flex align-items-center">
          {currentUser ? (
            <>
              {/* SEARCH */}
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  onChange={e => setSearch(e.target.value)} 
                  value={search}
                />
                <button 
                  className="btn btn-outline-success" 
                  type="button" 
                  onClick={searchHandler}
                >
                  Search
                </button>
              </form>

              {/* LOG-OUT */}
              <button
                type="button"
                className="ms-2 btn btn-outline-light"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* LOG-IN */}
              <button
                type="button"
                className="ms-2 btn btn-outline-light"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              {/* REGISTER */}
              <button
                type="button"
                className="ms-2 btn btn-outline-light"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
