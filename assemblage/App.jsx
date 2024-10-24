import { useEffect, useState } from "react";
import useFetch from "./hook/useFetch.js";
import Saison from "./components/Saison.jsx";
import * as React from "react"
import { Check} from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
const frameworks = [

]

const App = () => {
  const [query, setQuery] = useState("outer banks");
  const { data, isLoading, error } = useFetch(`https://api.tvmaze.com/search/shows?q=${query}`);
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const [episodes, setEpisodes] = useState([]); // État pour les épisodes
  const [selectedSeason, setSelectedSeason] = useState(1); // État pour la saison sélectionnée

  // Fonction pour gérer la mise à jour du terme de recherche
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  // Effet pour récupérer les données de la série avec les épisodes imbriqués
  useEffect(() => {
    const fetchData = async () => {
      if (data && data.length > 0) {
        try {
          // Récupérer les informations de la série et les épisodes
          const showId = data[0].show.id; // ID de la série
          const response = await fetch(`https://api.tvmaze.com/shows/${showId}?embed[]=episodes&embed[]=cast`);
          const result = await response.json();
          
          // Met à jour les épisodes à partir de la réponse
          setEpisodes(result._embedded.episodes);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [data]);

  // Fonction pour gérer le changement de saison
  const seasons = [...new Set(episodes.map(episode => episode.season))];
  const handleSeasonChange = (e) => {
    setSelectedSeason(Number(e.target.value)); // Met à jour la saison sélectionnée
  };


  return (
    <div>

<Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" flex justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            :<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.36675 2.29882C1.6164 3.04917 1.02119 3.93997 0.615099 4.92035C0.209011 5.90074 1.11811e-08 6.95151 0 8.01267C-1.11811e-08 9.07383 0.209011 10.1246 0.615099 11.105C1.02119 12.0854 1.6164 12.9762 2.36675 13.7265C3.11711 14.4769 4.00791 15.0721 4.98829 15.4782C5.96867 15.8843 7.01944 16.0933 8.0806 16.0933C9.14176 16.0933 10.1925 15.8843 11.1729 15.4782C12.1533 15.0721 13.0441 14.4769 13.7945 13.7265C15.2662 12.2027 16.0806 10.1618 16.0622 8.04336C16.0438 5.92493 15.194 3.89848 13.696 2.40047C12.198 0.902458 10.1716 0.0527411 8.05314 0.0343325C5.93471 0.015924 3.8938 0.830296 2.36999 2.30205M12.6536 12.5857C12.0559 13.1969 11.3428 13.6834 10.5557 14.0171C9.76863 14.3508 8.92317 14.5251 8.06828 14.5298C7.21339 14.5345 6.36606 14.3695 5.57535 14.0445C4.78464 13.7195 4.06626 13.2409 3.4618 12.6363C2.85735 12.0317 2.37883 11.3133 2.05395 10.5225C1.72908 9.73174 1.5643 8.88438 1.56916 8.02949C1.57402 7.17461 1.74842 6.32917 2.08226 5.54215C2.41611 4.75512 2.90276 4.04215 3.51405 3.4445C4.73085 2.25484 6.36772 1.59303 8.06942 1.60271C9.77113 1.61238 11.4004 2.29275 12.6036 3.49616C13.8068 4.69957 14.4868 6.32893 14.4962 8.03064C14.5056 9.73234 13.8435 11.3691 12.6536 12.5857Z" fill="black"/>
            <path d="M12.6502 14.9013C12.3472 14.5981 12.1771 14.1869 12.1772 13.7583C12.1774 13.3296 12.3478 12.9186 12.651 12.6156C12.9542 12.3126 13.3654 12.1425 13.7941 12.1426C14.2227 12.1428 14.6337 12.3132 14.9367 12.6164L19.5065 17.1878C19.6609 17.3369 19.784 17.5152 19.8686 17.7123C19.9533 17.9095 19.9979 18.1215 19.9998 18.3361C20.0016 18.5506 19.9608 18.7634 19.8795 18.962C19.7983 19.1606 19.6783 19.341 19.5266 19.4927C19.3748 19.6444 19.1944 19.7644 18.9958 19.8457C18.7972 19.9269 18.5844 19.9678 18.3699 19.9659C18.1553 19.9641 17.9433 19.9195 17.7461 19.8348C17.549 19.7501 17.3707 19.627 17.2216 19.4727L12.6502 14.9013Z" fill="black"/>
            </svg>
             }
         
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
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
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
      

      {isLoading && <p>Chargement...</p>}
      {error && <p>{error}</p>}
      {data && data.length > 0 && (
        <div>
          <h1>{data[0].show.name}</h1>
          <p><spam>Genres:</spam> {data[0].show.genres.join(", ")}</p>
          <p><spam>Première diffusion:</spam> {data[0].show.premiered}</p>
          <p><spam>Note moyenne:</spam> {data[0].show.rating?.average}</p>
          <p><spam><a href={data[0].show.url} target="_blank" rel="noopener noreferrer">Voir la série</a></spam></p>
          <img src={data[0].show.image?.medium} alt={data[0].show.name} />
          <p><spam>Résumé:</spam> {data[0].show.summary?.replace(/<\/?[^>]+(>|$)/g, "")}</p>
          





                                    {/*......................Enzo...............................*/}


          <div  className=" flex flex-col px-5 py-2.5 bg-lightBlack">
                 <Saison 
            episodes={episodes}
            selectedSeason={selectedSeason}
            onSeasonChange={handleSeasonChange}
          />
          </div>
     
        </div>
      )}
    </div>
  );
};

export default App;
