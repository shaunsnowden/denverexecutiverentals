import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Residences from "./pages/Residences";
import Home from "./pages/Home";
import TenantPortal from "./pages/Tenant-Portal";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import './App.css';

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

const App = () =>
  <Router>
    <div>
      <Navbar />
      <Wrapper>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/residences" component={Residences} />
        <Route exact path="/tenant-portal" component={TenantPortal} />
        <Route path="/callback" render={(props) => {
          // handleAuthentication(props);
          return <Callback {...props} />
        }} />
        {/* <Route exact path="/callback" component={Callback} /> */}
      </Wrapper>
      <Footer />
    </div>
  </Router>;

export default App;
