import React, {Component} from 'react';

class FavRestaurant extends Component {
  constructor(){
    super()

    this.state = {
      isFavorite: false
    }
  }

  handleClick = (e) => {
    e.stopPropagation()
    console.log('Clicking on favorite button')
    this.setState({
      isFavorite: !this.state.isFavorite
    })
  }

  render(){

    const isFavorite = (this.state.isFavorite) ? 'remove_from_fav' : 'add_to_fav'

    return(
      <div
        onClick={this.handleClick}
        className="film-row-fave add_to_fav">
        <p className="material-icons">add_to_fav</p>
      </div>
    )
  }
}

export default FavRestaurant;
