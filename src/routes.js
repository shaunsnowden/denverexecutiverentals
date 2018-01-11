import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import App from './App';
// import Home from './Home/Home';
import Residences from "./pages/Residences";
import Home from "./pages/Home";
import TenantPortal from "./pages/Tenant-Portal";
import Profile from './Profile/Profile';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
        <div>
        <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
          <Route exact path="/residences" component={Residences} />
          <Route exact path="/tenant-portal" component={TenantPortal} />
          <Route path="/profile" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/home"/>
            ) : (
              <Profile auth={auth} {...props} />
            )
          )} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>        
        </div>
      </Router>
  );
}
