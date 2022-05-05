import React, { Component } from 'react';
import Modal from '../Modal/Modal.jsx';
import PokemonModal from '../PokemonModal/PokemonModal.jsx'
import './IndividualPokemon.scss';
// import '../fonts/pokemon_pixel_font.ttf'

class IndividualPokemon extends Component {
  constructor(props){
    super(props);

    this.state = {
      favorited: false,
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };


  changeShow() {
    this.setState({
      show: false,
    });
  }

  hideModal = () => {
    this.setState({
      show: false
    }, function() {
      this.changeShow();
    });
  };

  favoriteCurrentToggle() {
    this.setState({
      favorited: !this.state.favorited,
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.favorite !== prevProps.favorite) {
      this.setState({
        favorited: this.props.favorite,
      })
    }
  }

  render() {
    const {name, num, sprite, shinySprite, weight, height, type} = this.props.data;

    let buffer = '';
    if (num < 10) {
      buffer = '00';
    } else if (num < 100) {
      buffer = '0'
    }

    return (
      <div className="individual-pokemon" onClick={this.showModal}>

        <Modal show={this.state.show} handleClose={this.hideModal}>
          <PokemonModal
            data={this.props.data}
            addToFavorites={this.props.addToFavorites}
            favoriteCurrentToggle={this.favoriteCurrentToggle.bind(this)}
            favoriteStatus={this.state.favorited}
          />
        </Modal>

        <div className="card-content">
          <div className="pokemon-image">
            <img className="sprite" src={sprite}></img>
          </div>

          <div className="pokemon-info">
          <p>No<b>{buffer + String(num)}</b></p>
            <p>{name.toUpperCase()}</p>
            <p>Type: {type}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default IndividualPokemon;