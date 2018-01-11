import React, { Component } from "react";
import RCard from "../components/rCard";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";

// import rcards from "../rcards.json";
import Wrapper from "../components/Wrapper";
// import ApartmentModal from '../components/ApartmentModal';
// import ResponsiveModal from '../components/ResponsiveModal';
import ReactDOM from 'react-dom';
import $ from 'jquery';

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
      
      <Wrapper className="cardWrapper">

        {this.state.rcards.map(rcard => (
          <RCard
            id={rcard.id}
            key = {rcard.id}
            name={rcard.propertyTitle}
            image={rcard.image}
            address={rcard.propertyAddress}
            occupied={rcard.occupied}
            

          />
        ))}
        
      </Wrapper>
      
    </div>
    );
  }
}

export default Residences;
