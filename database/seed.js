const url = 'http://pokeapi.co/api/v2/pokemon'
const axios = require("axios");
const { Pokemon } = require("../database");
var Promise = require('promise');


function getPokemon(num) {
  return axios.get(`${url}/${num}`);
}

const promises = [];

let missing = [
  70,
  64,
  63,
  21,
  74,
  76,
  77,
  80,
  79,
]
missing.forEach((i => {
  // promises.push(getPokemon(i));



  setTimeout((() =>
    getPokemon(i)
    .then((result) => {
      let pokemon = result.data;

      let pokemonObj = {};
      pokemonObj['num'] = i
      pokemonObj['name'] = pokemon.species.name;
      pokemonObj['sprite'] = pokemon.sprites.front_default;
      pokemonObj['shinySprite'] = pokemon.sprites.front_shiny;
      pokemonObj['weight'] = pokemon.weight;
      pokemonObj['height'] = pokemon.height;
      pokemonObj['comments'] = [];
      pokemonObj['type'] = pokemon.types.map(type => type.type.name).join(', ');
      return pokemonObj;
    })
    .then((pokemonObj) => {
      Pokemon.create(pokemonObj, function(err, newPokemon){
              if(err) {
                console.log(err);
              }
              console.log('new pokemon added:', newPokemon.name);
            });
    })
  ), 50000)
  // })
  // Promise.all(promises).then(results => {
  //   results.forEach((result) => {
  //     console.log(result);
  //   //   let pokemon = result.data;
  //   //   let pokemonObj = {};
  //   //   pokemonObj['num'] = i
  //   //   pokemonObj['name'] = pokemon.species.name;
  //   //   pokemonObj['sprite'] = pokemon.sprites.front_default;
  //   //   pokemonObj['shinySprite'] = pokemon.sprites.front_shiny;
  //   //   pokemonObj['weight'] = pokemon.weight;
  //   //   pokemonObj['height'] = pokemon.height;
  //   //   pokemonObj['comments'] = [];
  //   //   pokemonObj['type'] = pokemon.types.map(type => type.type.name).join(', ');

  //   //   return pokemonObj;
  //   // })
  //   // .then((pokemonObj) => {
  //   //   Pokemon.create(pokemonObj, function(err, newPokemon){
  //   //     if(err) {
  //   //       console.log(err);
  //   //     }
  //   //     console.log('new pokemon added:', newPokemon.name);
  //   //   });
  //   });
  // });
}))

