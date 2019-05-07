import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  // console.log(props.restaurants.length)

  return(
  <nav className="navbar is-info" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
      </a>

      <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <Link
          to={'/'}
          className="navbar-item">Restaurants
          <span className="tag tag-spacing is-warning is-rounded">0</span>
        </Link>

        <Link
          to={'/favorites'}
          className="navbar-item">Favorites
          <span className="tag tag-spacing is-warning is-rounded">0</span>
        </Link>
        <Link
          className="navbar-item"
          to={'/create-restaurant'}>Create Restaurant</Link>
      </div>
    </div>
  </nav>
  )
}

export default Navbar;

