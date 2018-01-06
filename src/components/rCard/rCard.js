import React from "react";
import "./rCard.css";

const RCard = props => (
    <div className = "rcard">
        <div className = "img-container" id ={props.id}>
            <img alt={props.name} src={props.image}  />
        </div>
        <div className="content">
            <span>{props.name}</span>
        </div>
    </div>

);

export default RCard;