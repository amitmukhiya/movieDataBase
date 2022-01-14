import "./App.css";
// import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import SearchResult from "./components/SearchResult";
import HomePage from "./components/HomePage";
import MoreDetails from "./components/MoreDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (searchText)
      fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=df17fa8ae0c40937fe08a2c3315df8ce&language=en-US&query=${searchText}&page=1&include_adult=false`
      )
        .then((Response) => Response.json())
        .then((data) => {
          // console.log(data)
          setMovies(data.results);
        });
  }, [searchText]);

  // df17fa8ae0c40937fe08a2c3315df8ce

  return (
    <>
      <Router>
        <Navbar searchText={searchText} setSearchText={setSearchText} />
        <SearchResult searchText={searchText} setSearchText={setSearchText} movies={movies} setMovies={setMovies} />
        <Routes>
          <Route exact path="/MovieDataBase" element={<HomePage />} />
          <Route exact path="/movies/:id" element={<MoreDetails/>}/>
          {/* <Route exact path="/search" element={<SearchResult/>}/> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
