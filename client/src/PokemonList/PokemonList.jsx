import React from "react";
import './PokemonList.scss';
import IndividualPokemon from "../IndividualPokemon/IndividualPokemon.jsx";
import Cookies from 'js-cookie';

class PokemonList extends React.Component {
  constructor(props){
    super(props);

    console.log(Cookies.get('Newuser'));
    this.state = {
      pokemon: [],
      favorites: [],
      view: 'All',
      name: "",
      num: 0,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchPokemon = this.fetchPokemon.bind(this);
  }

  componentDidMount(){
    Cookies.set('pokeman', 'catchEm', { expires: 7})
    this.fetchPokemon();
  }

  fetchPokemon(){
    fetch("/api/pokemon")
      .then(response => response.json())
      .then(json => {
        this.setState({
          pokemon: json.pokemon
        })
      })
  }

  handleSubmit(event){
    event.preventDefault();

    fetch("/api/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        num: this.state.num,
        name: this.state.name
      })
    }).then(response => {
      this.fetchPokemon();
    })
  }


  addToFavorites(currentPokemon) {
    let result = this.state.favorites;
    let current = currentPokemon.name;
    let names = result.map((poke) => poke.name);

    if (names.includes(current)) {
      let index = 0;

      result.forEach((poke, idx) => {
        if (poke.name = current) {
          index = idx;
        }
      })

      result.splice(index, 1);
    } else {
      result.push(currentPokemon);
    }
    this.setState({
      favorites: result,
    })
  }

  changeView(e) {
    this.setState({
      view: e.target.value,
    })
  }

  displayAll() {
    return this.state.pokemon.map(data => {
      return <IndividualPokemon data={data} addToFavorites={this.addToFavorites.bind(this)} favorite={false}/>
    })
  }

  displayFavorites() {
    return this.state.favorites.map(data => {
      return <IndividualPokemon data={data} addToFavorites={this.addToFavorites.bind(this)} favorite={true}/>
    })
  }

  render(){
    let pokemonDisplay = this.displayAll.bind(this);

    if (this.state.view === 'Favorites') {
      pokemonDisplay = this.displayFavorites.bind(this);
    }

    return(
    <div className="Pokemon-List">
      <select className="favorite-or-all" onChange={this.changeView.bind(this)}>
        <option value="All" selected>All</option>
        <option value="Favorites">Favorites</option>
      </select>

        <h2 className="pokedex-title">POKeMON LIST</h2>
        <div className="individual-pokemon-list">
        {pokemonDisplay()}
    </div>
    </div>)
  }

}


export default PokemonList;