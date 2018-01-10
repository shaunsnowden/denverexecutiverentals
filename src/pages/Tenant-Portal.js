import React, { Component, Fragment } from "react";
import Container from "../components/Container";
import Callback from '../Callback/Callback';
import Auth from '../Auth/Auth';
import history from '../history';
import Profile from '../Profile/Profile';



const auth = new Auth();



class TenantPortal extends Component {
  login() {
    auth.login();
  }

  state = {
    user: "",
    password: ""
  };

  render() {
    const { isAuthenticated } = auth;
    return (
      <Container style={{ minHeight: "80%" }}>

        {
          isAuthenticated() && (
            <Fragment>
              <h4>
                You are logged in!
              </h4>

              <Profile auth={auth} />
            </Fragment>
          )
        }
        {
          !isAuthenticated() && (
            <h4>
              You are not logged in! Please{' '}
              <a
                style={{ cursor: 'pointer' }}
                onClick={this.login.bind(this)}
              >
                Log In
                </a>
              {' '}to continue.
              </h4>
          )
        }
      </Container>
    );
  }
}

export default TenantPortal;
