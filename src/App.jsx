import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Pokemon from "./Pokemon";
import "./App.css";

const App = () => {
  const [text, setText] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleText = (e) => setText(e.target.value);

  const PagesList = ({ names }) => {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <>
              {names
                .filter((name) => name.includes(text.toLowerCase()))
                .map((name) => (
                  <Link to={`/${name}`} className="element" key={name}>
                    {name}
                  </Link>
                ))}
            </>
          }
        />

        {names.map((name) => {
          return (
            <Route
              path={`/${name}`}
              element={<Pokemon name={name} />}
              key={name}
            />
          );
        })}
      </Routes>
    );
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokedex.mimo.dev/api/pokemon");
        const data = await response.json();
        setPokemons(data);
        setNames(data.map((pokemon) => pokemon.name));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <input
        type="text"
        value={text}
        placeholder="Search a pokémon..."
        className="input"
        onChange={handleText}
      />
      <br />
      <BrowserRouter>
        <PagesList names={names} />
      </BrowserRouter>
    </>
  );
};

export default App;
