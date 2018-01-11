import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import $ from 'jquery';
import './Profile.css';
import Auth from '../Auth/Auth';

let profileAuth = Auth;

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
    if (this.state.profile){
      // let apiRentalRoute = '/api/rentals?sub=' + JSON.stringify(this.state.profile, null, 2);
      console.log(this.state.profile);
      $.get('/api/rentals')
        .done(
          res=>{console.log(res);
          this.setState({
            tenantName: res.tenantName,
            propertyTitle: res.propertyTitle,
            porpertyAddress: res.propertyAddress,
            imageSource: res.image,
            leaseEnd: res.leaseEnd, 
            monthlyRent: res.monthlyRent
          });
          }
        )
    }
  }

  // renderImg(src){
  //   return(
  //     <div>
  //       <img src={res.image}/>
  //     </div>
  //   )
  // }

  render() {
    const { profile } = this.state;
    return (
      <div className="container">
        <div className="profile-area">
          <h1>{profile.name}</h1>
          <Panel header="Profile">
            <img src={profile.picture} alt="profile" />
            <div>
              <ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel>
              <h3>{profile.nickname}</h3>
            </div>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </Panel>
        <img src={this.state.imageSource}/>
        </div>
      </div>
    );
  }
}

export default Profile;
