import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Residences from "./pages/Residences";
import Home from "./pages/Home";
import TenantPortal from "./pages/Tenant-Portal";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import './App.css';

const App = () =>
  <Router>
    <div>
      <Navbar />
      <Wrapper>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/residences" component={Residences} />
        <Route exact path="/tenant-portal" component={TenantPortal} />
      </Wrapper>
      <Footer />
    </div>
  </Router>;

export default App;
