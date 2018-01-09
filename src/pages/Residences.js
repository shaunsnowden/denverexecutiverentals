import React, { Component } from "react";
import RCard from "../components/rCard";
import rcards from "../rcards.json";
import Wrapper from "../components/Wrapper";
// import ApartmentModal from '../components/ApartmentModal';
// import ResponsiveModal from '../components/ResponsiveModal';
import ReactDOM from 'react-dom';

class Residences extends Component {

  constructor(props) {
    super(props);
    this.state = { isOpen: false, rcards: rcards };
  }


  render() {
    return (
    <div>
      <Wrapper className="cardWrapper">

        {this.state.rcards.map(rcard => (
          <RCard
            id={rcard.id}
            key = {rcard.id}
            name={rcard.name}
            image={rcard.image}
            description={rcard.description}
            

          />
        ))}

        
      </Wrapper>
      
    </div>
    );
  }
}

export default Residences;
