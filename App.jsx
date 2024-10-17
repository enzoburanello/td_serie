import { useState } from "react";
import useFetch from "./hook/useFetch.js";

const App = () => {
  const [query, setQuery] = useState("");  // Terme de recherche initial
  const { data, isLoading, error } = useFetch(`https://api.tvmaze.com/search/shows?q=${query}`);

  // Fonction pour gérer la mise à jour du terme de recherche
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      {/* Barre de recherche */}
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Rechercher un film ou une série"
      />
      
      {/* Affichage des données */}
      {isLoading && <p>Chargement...</p>}
      {error && <p>{error}</p>}
      {data && data.length > 0 && (
        <div>
          <h1>{data[0].show.name}</h1>
          <p>Genre: {data[0].show.genres.join(", ")}</p>
          <p>Résumé: {data[0].show.summary?.replace(/<\/?[^>]+(>|$)/g, "")}</p>
        </div>
      )}
    </div>
  );
};

export default App;
