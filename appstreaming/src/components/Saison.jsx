function Saison({ episodes, selectedSeason, onSeasonChange }) {
  // Création de la liste des saisons disponibles sans utiliser Set
  const seasons = episodes.reduce((acc, episode) => {
    if (!acc.includes(episode.season)) {
      acc.push(episode.season);
    }
    return acc;
  }, []);
  
  // Filtrage des épisodes par saison sélectionnée
  const filteredEpisodes = episodes.filter(episode => episode.season === selectedSeason);

  return (
    <div className="flex flex-col gap-5 ">
      {/* Sélecteur de saison */}
      <label htmlFor="season-select"></label>
      <select id="season-select"  className="w-28 rounded-sm bg-veryDarkGray text-blanc px-2.5 py-.25 gap-9 flex justify-center items-center lg:w-44 lg:text-lg" value={selectedSeason} onChange={onSeasonChange}>
        {seasons.map((season) => (
          <option key={season} value={season}>
            Saison {season}
          </option>
        ))}
      </select>

      {/* Affichage des épisodes de la saison sélectionnée */}
      {filteredEpisodes.length > 0 ? (
        <ul className=" flex flex-col gap-5 lg:gap-10 text-blanc">

          {filteredEpisodes.map((episode) => (
            <li className="grid grid-rows-layout grid-cols-layout gap-2 lg:gap-5 " key={episode.id}>
              
              
                {episode.image && <img className="w-28 h-16 col-span-1 lg:row-span-2 lg:h-56 lg:w-96 " src={episode.image.original} alt={episode.name} />}

                <p className="lg:text-2xl col-start-2 font-bebas text-sm">{episode.name}</p>

    
              <p className="lg:col-start-2 lg:text-lg col-span-2 font-quicksand text-xs">{episode.summary?.replace(/<\/?[^>]+(>|$)/g, "") || "Pas de résumé disponible."}</p>
           
            </li>
          ))}
        </ul>
      ) : (
        <p>Pas d'informations sur les épisodes disponibles.</p>
      )}
    </div>
  );
}

export default Saison;