import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NavBar.css';

class Header extends Component {
  navbarLinks() {

    //Return different links depending on the authentication status
    if (this.props.authenticated) {
      return(
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="/details">Details</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/mapping">Mapping</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/signout">Sign Out</a>
          </li>
        </ul>
 
      );
    }
    return (
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" href="/signin">Sign In</a> 
        </li>
      </ul>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">MarsX</a>
        <div>
        {this.navbarLinks()}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
