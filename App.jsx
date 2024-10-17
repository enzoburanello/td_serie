import { useEffect, useState } from "react";
import usefetch from "./hook/useFetch.js"

const App = () =>{

  const {data} = usefetch('https://api.tvmaze.com/search/shows?q=Girls')

  console.log(data)
  
  return (
    <div>
      {data?.length}
    </div>
  );
}
export default App