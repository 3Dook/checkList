
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navbar: false
    };
    this.toggleNavBar = this.toggleNavBar.bind(this);
  }

  toggleNavBar(){
    this.setState({navbar: !this.state.navbar})
  }

  render() {
    const show = (this.state.navbar) ? "show" : "";

    return (

      <nav className="navbar navbar-dark bg-dark navbar-expand-md">
        <Link to="/" className="navbar-brand">HOME</Link>
        <button className="navbar-toggler" type="button" onClick={ this.toggleNavBar }>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={"collapse navbar-collapse " + show}>
            <div className="navbar-nav">
              <Link to="/find" className="nav-link">FIND</Link>
              <Link to="/create" className="nav-link">CREATE</Link>
        <Link to="/edit" className="nav-link">EDIT</Link>
        <Link to="/delete" className="nav-link"> DELETE</Link>
        <Link to="/aboutMe" className="nav-link">ABOUTME</Link>
            </div>
        </div>
        </nav>

    );
  }
}