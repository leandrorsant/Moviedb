import React, { useState } from "react";
import { useEffect } from "react";

import "./App.css"
import SearchIcon from "./search.svg"
import MovieCard from "./MovieCard";
const API_URL =  process.env.REACT_APP_API_URL;

const handlekeyDown = (key, searchFunction) => {
    if(key.code == 'Enter'){
        searchFunction();
    }
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTearm] = useState('');
    

    const searchMovies = async (query) => {
        const response = await fetch( API_URL + "&s=" + query);
        const data = await response.json();
        console.log( API_URL + "&t=" + query + "&plot=full");
        console.log(data)
        setMovies(data.Search);
    }

    useEffect(() => {        
        searchMovies(searchTerm);
        console.log(movies')    
    }, []);

    return (
        <div className="app">
            <h1>MovieDB</h1>
            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onKeyDown={(key) => handlekeyDown(key, () => searchMovies(searchTerm))}
                    onChange={ (input) => setSearchTearm(input.target.value)
                 }
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={ () => searchMovies(searchTerm)}
                />
            </div>

            <div className="container">
            {movies !== undefined && movies.length > 0
                ? movies.map(
                    (data, index) => (
                    <MovieCard movie={data}/>)
                ) : (
                    searchTerm !== ''
                    ?
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                    : ""
                )
            }
            </div>
        </div>
    );
}

export default App;