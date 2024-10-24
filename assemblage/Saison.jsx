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
        <select id="season-select"  className="w-28 rounded-sm bg-veryDarkGray text-blanc px-2.5 py-.25 gap-9 flex justify-center items-center lg:w-44 " value={selectedSeason} onChange={onSeasonChange}>
          {seasons.map((season) => (
            <option key={season} value={season}>
              Saison {season}
            </option>
          ))}
        </select>
  
        {/* Affichage des épisodes de la saison sélectionnée */}
        {filteredEpisodes.length > 0 ? (
          <ul className="flex flex-col gap-6 text-blanc   ">

            {filteredEpisodes.map((episode) => (
              <li className="flex flex-col gap-2 lg:flex-row " key={episode.id}>
                
                <div className="flex flex-row items-center gap-4 lg:flex- ">
                  {episode.image && <img className="w-28 h-16" src={episode.image.medium} alt={episode.name} />}

                  <p className="font-bebas text-sm">{episode.name}</p>
  
                </div>
      
                <p className="font-quicksand text-xs">{episode.summary?.replace(/<\/?[^>]+(>|$)/g, "") || "Pas de résumé disponible."}</p>
             
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
  