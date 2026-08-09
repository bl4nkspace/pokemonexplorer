import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Pokemon.css";

function Pokemon({ name }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokedex.mimo.dev/api/pokemon/${name}`
        );
        const data = await response.json();
        setPokemonData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [name]); // Ajout de 'name' comme dépendance

  if (loading) {
    return <div>loading...</div>;
  }

  const PokemonStats = ({ stats }) => {
    return stats.map((stat) => (
      <div key={stat.stat.name}>
        <p>
          {stat.stat.name}:
          <ul>
            <li>Value: {stat.base_stat}</li>
            <li>Effort: {stat.effort}</li>
          </ul>
        </p>
      </div>
    ));
  };

  return (
    <div>
      <Link to="/" className="back">
        {" "}
        Back
      </Link>
      <br />
      <h1 id="name">{pokemonData.name}</h1>
      <div className="images">
        <p>
          Default:
          <br />
          <img
            src={pokemonData.sprites.front_default}
            alt={`${pokemonData.name} front`}
          />
          <img
            src={pokemonData.sprites.back_default}
            alt={`${pokemonData.name} back`}
          />
        </p>
        <p>
          Shiny:
          <br />
          <img
            src={pokemonData.sprites.front_shiny}
            alt={`${pokemonData.name} shiny front`}
          />
          <img
            src={pokemonData.sprites.back_shiny}
            alt={`${pokemonData.name} shiny back`}
          />
        </p>
      </div>
      <p>Id: {pokemonData.id}</p>
      <p>Order: {pokemonData.order}</p>
      <p>Weight: {pokemonData.weight}</p>
      <p>Height: {pokemonData.height}</p>
      <p>Base Experience: {pokemonData.base_experience}</p>
      <PokemonStats stats={pokemonData.stats} />{" "}
      {/* Passage des données de stats */}
    </div>
  );
}

export default Pokemon;
