import { useState } from "react";
import { useGlobalContext } from "@/context/global";
import Router from "next/router";

export default function Home() {
  const {
    allPokemonData,
    searchResults,
    next,
    getPokemon,
    loading,
    realTimeSearch,
    setSelectedType,
    selectedType,
  } = useGlobalContext();

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
    realTimeSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    realTimeSearch(search);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    realTimeSearch(search);
  };

  const displaySearchResults = () => {
    return searchResults.map((pokemon) => (
      <div
        key={pokemon.name}
        onClick={() => {
          Router.push(`/pokemon/${pokemon.name}`);
        }}
        className="pokemon-name"
      >
        {pokemon.name}
      </div>
    ));
  };

  return (
    <main>
      <form action="" className="search-form" onSubmit={handleSearch}>
        <div className="input-control">
          <select value={selectedType} onChange={handleTypeChange} className ="select-value">
            <option value="">Select</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            <option value="electric">Electric</option>
            <option value="psychic">Psychic</option>
            <option value="ice">Ice</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
            <option value="fairy">Fairy</option>
          </select>
          <input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Search for a Pokemon..."
          />
          <button className="submit-btn" type="submit">
            Search
          </button>
        </div>
      </form>

      {search && searchResults.length > 0 && (
        <div className="search-results">{displaySearchResults()}</div>
      )}

      <div className="all-pokemon">
        {allPokemonData ? (
          allPokemonData.map((pokemon) => (
            <div
              key={pokemon.id}
              className="card"
              onClick={() => {
                Router.push(`/pokemon/${pokemon.name}`);
              }}
            >
              <div className="card-image">
                <img
                  src={pokemon.sprites.other.home.front_shiny}
                  alt={pokemon.name}
                />
              </div>
              <div className="card-body">
                <h3>{pokemon.name}</h3>
                <p>Details &nbsp; &rarr;</p>
              </div>
            </div>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>

      <div className="next">
        {allPokemonData.length > 0 && (
          <button className="next-btn" onClick={next}>
            Load More &darr;
          </button>
        )}
      </div>
    </main>
  );
}
