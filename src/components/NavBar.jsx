import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Navbar, Nav, NavItem} from 'react-bootstrap';
import './css/NavBar.css';

class Header extends Component {
  navbarLinks() {

    //Return different links depending on the authentication status
    if (this.props.authenticated) {
      return(
        <div>
          <Nav>
            <NavItem eventKey={1} href="details">Details</NavItem>
            <NavItem eventKey={2} href="mapping">Mapping</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={3} href="signout">Sign Out</NavItem>
          </Nav>
        </div>
      );
    }
    return (
      <Nav pullRight>
        <NavItem eventKey={4} href="signin">Sign In</NavItem>
      </Nav>
    );
  }

  render() {
    return (
      <Navbar inverse className="nav">
        <Navbar.Header>
          <Navbar.Brand >
            <a href="/">MARS</a>
          </Navbar.Brand>
        </Navbar.Header>
        {this.navbarLinks()}
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
