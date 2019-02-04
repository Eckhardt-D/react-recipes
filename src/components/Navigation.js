import React, { Component } from 'react'
import {auth} from '../services/firebase'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap'

import SearchBox from './SearchBox'

export default class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      user: auth.currentUser
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  onChange(e) {
    console.log(e)
  }
  logOut() {
    auth.signOut().then(() => {
      this.props.history.push('/')
    })
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Recipe Journal</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="mr-5">
                <SearchBox onChange={this.onChange} />
              </NavItem>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/new">Add Recipe</NavLink>
              </NavItem>
              <NavItem>
                {this.state.user ? <NavLink onClick={this.logOut} href="#">Logout</NavLink> : null}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
