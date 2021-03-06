import React, { Component, Fragment } from "react";
import Container from "../components/Container";
import Auth from '../Auth/Auth';
import Profile from '../Profile/Profile';
import Footer from "../components/Footer";



const auth = new Auth();



class TenantPortal extends Component {
  login() {
    auth.login();
  }

  logout() {
    auth.logout();
  }

  state = {
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
                {' '}
                <a style={{ cursor: 'pointer' }} onClick={this.logout.bind(this)}>
                 Click Here
                </a>
                {' '}to Log Out.
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
        <div>
          <Footer />
        </div>
      </Container>
    );
  }
}

export default TenantPortal;
