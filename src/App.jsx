import { useEffect, useState } from "react";
import useFetch from "./hook/useFetch.js";
import * as React from "react";
import { Check } from "lucide-react";
import avatar from "./assets/avatar.png";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [];

const App = () => {
  const [query, setQuery] = useState("outer banks");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [episodes, setEpisodes] = useState([]); // État pour les épisodes
  const [selectedSeason, setSelectedSeason] = useState(1); // État pour la saison sélectionnée

  // Fonction pour gérer la mise à jour du terme de recherche
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  // Appel de l'API pour récupérer les données de la série avec les épisodes imbriqués
  const { data, isLoading, error } = useFetch(`https://api.tvmaze.com/singlesearch/shows?q=${query}&embed[]=seasons&embed[]=episodes&embed[]=cast`);

  // Mettre à jour les épisodes quand `data` change
  useEffect(() => {
    if (data?._embedded?.episodes) {
      setEpisodes(data._embedded.episodes);
    }
  }, [data]);

  // Extraire les saisons uniques des épisodes
  const seasons = [...new Set(episodes.map((episode) => episode.season))];

  // Filtrer les épisodes de la saison sélectionnée
  const filteredEpisodes = episodes.filter(
    (episode) => episode.season === selectedSeason
  );

  // Fonction pour gérer le changement de saison
  const handleSeasonChange = (e) => {
    setSelectedSeason(Number(e.target.value));
  };

  return (
    <div className="w-screen">
      <div className="absolute flex justify-between items-center z-20">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="research" role="combobox" aria-expanded={open}>
              {value ? (
                frameworks.find((framework) => framework.value === value)?.label

              ) : (

                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.36675 2.29882C1.6164 3.04917 1.02119 3.93997 0.615099 4.92035C0.209011 5.90074 1.11811e-08 6.95151 0 8.01267C-1.11811e-08 9.07383 0.209011 10.1246 0.615099 11.105C1.02119 12.0854 1.6164 12.9762 2.36675 13.7265C3.11711 14.4769 4.00791 15.0721 4.98829 15.4782C5.96867 15.8843 7.01944 16.0933 8.0806 16.0933C9.14176 16.0933 10.1925 15.8843 11.1729 15.4782C12.1533 15.0721 13.0441 14.4769 13.7945 13.7265C15.2662 12.2027 16.0806 10.1618 16.0622 8.04336C16.0438 5.92493 15.194 3.89848 13.696 2.40047C12.198 0.902458 10.1716 0.0527411 8.05314 0.0343325C5.93471 0.015924 3.8938 0.830296 2.36999 2.30205M12.6536 12.5857C12.0559 13.1969 11.3428 13.6834 10.5557 14.0171C9.76863 14.3508 8.92317 14.5251 8.06828 14.5298C7.21339 14.5345 6.36606 14.3695 5.57535 14.0445C4.78464 13.7195 4.06626 13.2409 3.4618 12.6363C2.85735 12.0317 2.37883 11.3133 2.05395 10.5225C1.72908 9.73174 1.5643 8.88438 1.56916 8.02949C1.57402 7.17461 1.74842 6.32917 2.08226 5.54215C2.41611 4.75512 2.90276 4.04215 3.51405 3.4445C4.73085 2.25484 6.36772 1.59303 8.06942 1.60271C9.77113 1.61238 11.4004 2.29275 12.6036 3.49616C13.8068 4.69957 14.4868 6.32893 14.4962 8.03064C14.5056 9.73234 13.8435 11.3691 12.6536 12.5857Z" fill="white" />
                  <path d="M12.6502 14.9013C12.3472 14.5981 12.1771 14.1869 12.1772 13.7583C12.1774 13.3296 12.3478 12.9186 12.651 12.6156C12.9542 12.3126 13.3654 12.1425 13.7941 12.1426C14.2227 12.1428 14.6337 12.3132 14.9367 12.6164L19.5065 17.1878C19.6609 17.3369 19.784 17.5152 19.8686 17.7123C19.9533 17.9095 19.9979 18.1215 19.9998 18.3361C20.0016 18.5506 19.9608 18.7634 19.8795 18.962C19.7983 19.1606 19.6783 19.341 19.5266 19.4927C19.3748 19.6444 19.1944 19.7644 18.9958 19.8457C18.7972 19.9269 18.5844 19.9678 18.3699 19.9659C18.1553 19.9641 17.9433 19.9195 17.7461 19.8348C17.549 19.7501 17.3707 19.627 17.2216 19.4727L12.6502 14.9013Z" fill="white" />
                </svg>

              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="">
            <Command>
              <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Rechercher un film ou une série"
              />
              <CommandList>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "",
                          value === framework.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {avatar && <img src={avatar} alt="Avatar" />}
      </div>

      {isLoading && <p>Chargement...</p>}
      {error && <p>{error}</p>}

      {data && (
        <div className="h-screen">
          <div className="relative font-quicksand">
            <div className="relative">
              <img
                className="w-full h-auto object-cover md:h-screen lg:h-screen"
                src={data.image.original}
                alt={data.name}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent z-0"></div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-end z-10 w-full py-5 px-5 text-white lg:px-20 lg:gap-10">
              <div className="flex flex-col gap-3 w-full lg:w-3/4 md:3/4 lg:pb-36">
                <h1 className="text-4xl font-bebas uppercase lg:text-7xl">
                  {data.name}
                </h1>
                <p className="text-xs lg:text-lg">
                  {data.summary?.replace(/<\/?[^>]+(>|$)/g, "")}
                </p>
                <div className="flex gap-4 text-xs md:text-lg lg:text-lg">
                  <p className="bg-darkGray px-2 py-1 rounded">
                    {data.genres.join(", ")}
                  </p>
                  <p className="bg-darkGray px-2 py-1 rounded">{data.premiered}</p>
                  <p className="bg-darkGray px-2 py-1 rounded">
                    {data.rating?.average}/10
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sélecteur de Saison */}
          <div className="px-5 py-4 bg-lightBlack">
            <label htmlFor="season-select" className="w-28 rounded-sm bg-veryDarkGray text-blanc px-2.5 py-0.25 gap-9 flex justify-center items-center lg:w-44 lg:text-lg">
            </label>
            <select
              id="season-select"
              value={selectedSeason}
              onChange={handleSeasonChange}
              className="ml-2 p-2 rounded bg-darkGray text-white"
            >
              {seasons.map((season) => (
                <option key={season} value={season}>
                  Saison {season}
                </option>
              ))}
            </select>

            {/* Liste des Épisodes avec Images et Descriptions */}
            <div className="mt-4">
              <ul className="flex flex-col gap-5 lg:gap-10 text-blanc">
                {filteredEpisodes.map((episode) => (
                  <li
                    key={episode.id}
                    className="grid grid-rows-layout grid-cols-layout gap-2 lg:gap-5"
                  >
                    {episode.image ? (
                      <img
                        src={episode.image.medium}
                        alt={episode.name}
                        className="w-28 h-16 col-span-1 lg:row-span-2 lg:h-56 lg:w-96"
                      />
                    ) : (
                      <div className="">
                        <span className="">Pas d'image</span>
                      </div>
                    )}
                    <div className="text-white">
                      <h3 className="lg:text-2xl col-start-2 font-bebas text-sm">{episode.number}. {episode.name}</h3>
                      <p className="lg:col-start-2 lg:text-lg col-span-2 font-quicksand text-xs">
                        {episode.summary
                          ? episode.summary.replace(/<\/?[^>]+(>|$)/g, "")
                          : "Pas de description disponible."}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
