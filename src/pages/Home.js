import React from "react";
import Hero from "../components/Hero";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";

const Home = () =>
  <div>
    <Hero backgroundImage="https://images1.apartments.com/i2/H08vGwbM0f7OnrMWiOPrz4356l9N-ZtuSp1_D0ZHBs0/117/the-apartments-at-denver-place-denver-co-building-photo.jpg">
      <h1>Corporate Executive Rentals</h1>
      <h2>Denver Metro Area</h2>
    </Hero>
    <Container style={{ marginTop: 30 }}>
      <Row>
        <Col size="md-12">
          <h1>Denver's premiere coporate rental group</h1>
        </Col>
      </Row>
      <Row>
        <Col size="md-12">
          <p>
            Denver Executive Rentals is the premiere real estate management group for both short term and long-term rentals.  
            Our group manages a range of properties from modern lofts in the heart of downtown Denver
            to lodges situated near the best ski resorts the Rocky Mountains has to offer.
          </p>
          <p>
            If you are a prospective tenant, click on our "Residences" page to view information on all of our
            current properties.  Currents tenants please log in using our "Tenant Portal" page.
          </p>
          <h2>Contact</h2>
          <p>
            Email: denverrentz@jeemail.com
          </p>
          <p>
            Phone: 970-555-1010
          </p>
        </Col>
      </Row>
    </Container>
  </div>;

export default Home;
