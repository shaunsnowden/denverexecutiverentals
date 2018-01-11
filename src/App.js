import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="container-fluid">
        <nav className="navbar navbar-default">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              Corporate Executive Rentals
            </Link>
          </div>
          <ul className="nav navbar-nav">
            <li
              className={
                window.location.pathname === "/" ||
                  window.location.pathname === "/home"
                  ? "active"
                  : ""
              }
            >
              <Link to="/Home">Home</Link>
            </li>
            <li
              className={window.location.pathname === "/residences" ? "active" : ""}
            >
              <Link to="/residences">Residences</Link>
            </li>
            <li className={window.location.pathname === "/tenant-portal" ? "active" : ""}>
              <Link to="/tenant-portal">Tenant Portal</Link>
            </li>
          </ul>
          {
          !isAuthenticated() && (
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.login.bind(this)}
            >
              Log In
            </Button>
          )
          }
          {
          isAuthenticated() && (
              <Button
                  bsStyle="primary"
                  className="btn-margin"
                onClick={this.logout.bind(this)}
              >
                  Log Out
                </Button>
            )
          }
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>

    );
  }
}

export default App;
