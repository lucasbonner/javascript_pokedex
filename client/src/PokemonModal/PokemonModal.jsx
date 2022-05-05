import React, { Component } from 'react';
import Modal from '../Modal/Modal.jsx';
import './PokemonModal.scss'

class PokemonModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sprite: 'normal',
    }
  }

  formatHeight(height) {
    let feetInches = (height / 3.048).toFixed(2);
    return `${feetInches.split('.').join("'")}"`
  }

  showShiny() {
    let changer = 'shiny';
    if (this.state.sprite === 'shiny') {
      changer = 'normal';
    }

    this.setState({
      sprite: changer,
    })
  }

  handleClick() {
    this.props.addToFavorites(this.props.data);
    this.props.favoriteCurrentToggle();
  }

  render() {
    const {
      height,
      name,
      num,
      shinySprite,
      sprite,
      type,
      weight,
    } = this.props.data;

    let buffer = '';
    if (num < 10) {
      buffer = '00';
    } else if (num < 100) {
      buffer = '0'
    }

    let displaySprite = sprite;
    if (this.state.sprite === 'shiny') {
      displaySprite = shinySprite;
    }

    let favoriteText = 'Favorite';

    if (this.props.favoriteStatus) {
      favoriteText = 'Favorited';
    }

    return (
      <div className="individual-pokemon-modal">
        <div className="number-and-name">
          <p className="pokemon-number-modal">No{buffer + String(num)}</p>
          <p className="pokemon-name-modal">{name.toUpperCase()}</p>
        </div>
        <p>HT {this.formatHeight(height)}</p>
        <p>WT  {weight} lbs.</p>
        <div className="sprite-container">
          <img className="sprite-modal" src={displaySprite} />
        </div>
        <button onClick={this.handleClick.bind(this)} className="favorite-button">{favoriteText}</button>
        <button onClick={this.showShiny.bind(this)} className="shiny-button">Shiny</button>
      </div>
    )
  }
}


export default PokemonModal;