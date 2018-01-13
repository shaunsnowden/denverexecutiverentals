import React, { Component } from "react";
import RCard from "../components/rCard";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";

// import rcards from "../rcards.json";
import Wrapper from "../components/Wrapper";
// import ApartmentModal from '../components/ApartmentModal';
// import ResponsiveModal from '../components/ResponsiveModal';
// import ReactDOM from 'react-dom';
import $ from 'jquery';
import Map from "../components/Map/Map";
import Footer from "../components/Footer";

class Residences extends Component {

  constructor(props) {
    super(props);
    this.state = { isOpen: false, rcards: [] };
  }

  componentDidMount() {
      $.get('/api/properties')
        .done(
          res=>{console.log(res);
          this.setState({rcards: res});
          }
        )
      }

  render() {
    return (
    <div>
      <Container>
        <Row>
          <Col size="md-12">
      <Map
          id={this.props.id}
          key = {this.props.id}
          name={this.props.propertyTitle}
          image={this.props.image}
          address={this.props.propertyAddress}
          occupied={this.props.occupied}
          lat={this.props.lat}
          lng={this.props.lng}      
          monthlyRent={this.props.monthlyRent}
          leaseEnd={this.props.leaseEnd}
         />
          </Col>
          </Row>
      </Container>
      <Wrapper className="cardWrapper">

        {this.state.rcards.map(rcard => (
          <RCard
            id={rcard.id}
            key = {rcard.id}
            name={rcard.propertyTitle}
            image={rcard.image}
            address={rcard.propertyAddress}
            occupied={rcard.occupied}
            lat={rcard.lat}
            lng={rcard.lng}

          />
        ))}
        
      </Wrapper>
    </div>
    );
  }
}

export default Residences;
