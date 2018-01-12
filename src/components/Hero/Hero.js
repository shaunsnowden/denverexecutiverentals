// import React from "react";
import React, { Component } from 'react';
import "./Hero.css";
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';


class Hero extends Component {
  render() {
    return (
      <Carousel>
        <div>
            <img src="https://www.castlemarne.com/wp-content/uploads/2016/04/Denver-skyline-1024x645.jpg" />
        </div>
        <div>
          <img src="https://res.cloudinary.com/simpleview/image/upload/c_fill,f_auto,h_645,q_50,w_1024/v1/clients/denver/Denver_Sunrise_II_good_thru_10_1_2018_978b1d85-6252-4a06-af5b-297c5ce9424e.jpg" />
        </div>
        <div>
          <img src="https://reignmag.com/wp-content/uploads/2014/12/2014-7-1024x682.jpg" />
        </div>
      </Carousel>
    );
  }
};

export default Hero;
