import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import $ from 'jquery';
import './Profile.css';

class Profile extends Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  componentDidMount() {
    if (this.state.profile) {
      // let apiRentalRoute = '/api/rentals?sub=' + JSON.stringify(this.state.profile, null, 2);
      console.log(this.state.profile.sub);
      $.get('/api/rentals')
        .done(
        res => {
          console.log(res);
          this.setState({
            tenantName: res.tenantName,
            propertyTitle: res.propertyTitle,
            propertyAddress: res.propertyAddress,
            imageSource: res.image,
            leaseEnd: res.leaseEnd,
            monthlyRent: res.monthlyRent
          });
        }
        )
    }
  }

  render() {
    const { profile } = this.state;
    return (
      <div className="container">
        <div className="profile-area">
          <h1>{profile.name}</h1>
          <h3>{profile.sub}</h3>
          <Panel header="Profile">
            <img src={profile.picture} alt="profilePic" />
            <h3>{profile.nickname}</h3>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </Panel>

          <Panel header="Your Rental Property">
            <h3>{this.state.propertyTitle}</h3>
            <img src={this.state.imageSource} alt="rentalImg" />  
            <h4>{this.state.propertyAddress}</h4>
          </Panel>

        </div>
      </div>
    );
  }
}

export default Profile;
