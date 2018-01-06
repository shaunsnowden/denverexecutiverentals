import React, { Component } from "react";
import RCard from "../components/rCard";
import rcards from "../rcards.json";
import Wrapper from "../components/Wrapper";

class Residences extends Component {
  state = {
    rcards
  };


  render() {
    return (
    <div>
      <Wrapper className="cardWrapper">

        {this.state.rcards.map(rcard => (
          <RCard
            id={rcard.id}
            name={rcard.name}
            image={rcard.image}

          />
        ))}
      </Wrapper>
    </div>
    );
  }
}

export default Residences;
