import React from "react";
import reactDOM from "react-dom";

import PokemonList from "./PokemonList/PokemonList.jsx";

const App = () => {
  return <div className="App">
    <PokemonList />
  </div>
}

reactDOM.render(<App />, document.getElementById("root"));