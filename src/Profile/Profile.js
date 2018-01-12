import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import $ from 'jquery';
import './Profile.css';
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import Modal from 'react-responsive-modal';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = { profile: {}, openPayment: false, openMaintenance: false };
  }

  // modal functions
  onOpenPaymentModal = () => {
    this.setState({ openPayment: true });
  };
  
  onClosePaymentModal = () => {
    this.setState({ openPayment: false });
  };

  onOpenMaintenanceModal = () => {
    this.setState({ openMaintenance: true });
  };
  
  onCloseMaintenanceModal = () => {
    this.setState({ openMaintenance: false });
  };

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        console.log(profile);
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
      console.log(this.state.profile);
    }
  }

  componentDidMount() {
    
    this.props.auth.getProfile((err, profile) => {
      if (profile && profile.sub) {
        // let apiRentalRoute = '/api/rentals?sub=' + JSON.stringify(this.state.profile, null, 2);
        $.get(`/api/rentals?sub=${profile.sub}`)
          .done(
          res => {
            if(res){
            console.log(res);
            this.setState({
              tenantName: res.tenantName,
              propertyTitle: res.propertyTitle,
              propertyAddress: res.propertyAddress,
              imageSource: res.image,
              leaseEnd: res.leaseEnd,
              monthlyRent: res.monthlyRent,
              rentDueDate: res.rentDueDate
            });
          }
          }
          )
      }
    });
  }

  render() {
    const { openPayment } = this.state;
    const { openMaintenance } = this.state;
    const { profile } = this.state;
    return (
      <div className="container">
        <div className="profile-area">
          <h1>Welcome, {profile.given_name}</h1>
          {/* <Panel header="Profile">
            <img src={profile.picture} alt="profilePic" />
            <h3>{profile.nickname}</h3>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </Panel> */}

          <Panel header={"Your Rental Property"}>
            <h3>{this.state.propertyTitle}</h3>
            <img src={this.state.imageSource} alt="rentalImg" />  
            <h4>{this.state.propertyAddress}</h4>
            <h4>Monthly Rent: ${this.state.monthlyRent}</h4>
            <h4>Rent is due on {this.state.rentDueDate}</h4>

            <div className="pay-rent">
              <button className="btn btn-action" id="pay-rent-button" onClick={this.onOpenPaymentModal}>
                Pay Rent
              </button>
              <Modal htmlFor="pay-rent-button" open={this.state.openPayment} onClose={this.onClosePaymentModal} little
                      classNames={{
                      transitionEnter: 'transition-enter',
                      transitionEnterActive: 'transition-enter-active',
                      transitionExit: 'transition-exit-active',
                      transitionExitActive: 'transition-exit-active',
                      }}
                      animationDuration={1000}>
                  <br/>

                  {/* Payment Form */}
                  <div className="container">
                  <div className="row">
                      <div className="col-xs-12 col-md-4">
                          <div className="panel panel-default">
                              <div className="panel-heading">
                                  <h3 className="panel-title">
                                      Payment Details
                                  </h3>
                                  <div className="checkbox pull-right">
                                      <label>
                                          <input type="checkbox" />
                                          Remember
                                      </label>
                                  </div>
                              </div>
                              <div className="panel-body">
                                  <form role="form">
                                  <div className="form-group">
                                      <label htmlFor="cardNumber">
                                          CARD NUMBER</label>
                                      <div className="input-group">
                                          <input type="text" className="form-control" id="cardNumber" placeholder="Valid Card Number"
                                              required autoFocus />
                                          <span className="input-group-addon"><span className="glyphicon glyphicon-lock"></span></span>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-xs-7 col-md-7">
                                          <div className="form-group">
                                              <label htmlFor="expityMonth">
                                                  EXPIRY DATE</label>
                                              <div className="col-xs-6 col-lg-6 pl-ziro">
                                                  <input type="text" className="form-control" id="expityMonth" placeholder="MM" required />
                                              </div>
                                              <div className="col-xs-6 col-lg-6 pl-ziro">
                                                  <input type="text" className="form-control" id="expityYear" placeholder="YY" required /></div>
                                          </div>
                                      </div>
                                      <div className="col-xs-5 col-md-5 pull-right">
                                          <div className="form-group">
                                              <label htmlFor="cvCode">
                                                  CV CODE</label>
                                              <input type="password" className="form-control" id="cvCode" placeholder="CV" required />
                                          </div>
                                      </div>
                                  </div>
                                  </form>
                              </div>
                          </div>
                          <ul className="nav nav-pills nav-stacked">
                              <li className="active"><a href="#"><span className="badge pull-right"><span className="glyphicon glyphicon-usd"></span>{this.state.monthlyRent}</span> Final Payment</a>
                              </li>
                          </ul>
                          <br/>
                          <a href="#" className="btn btn-success btn-lg btn-block" role="button">Pay</a>
                      </div>
                  </div>
              </div>
              
              
              </Modal>
            </div>

            <div className="maintenance">
              <button className="btn btn-action" id="maintenance-button" onClick={this.onOpenMaintenanceModal}>
                  Request Maintenance
              </button>
                <Modal htmlFor="maintenance-button" open={this.state.openMaintenance} onClose={this.onCloseMaintenanceModal} little
                        classNames={{
                        transitionEnter: 'transition-enter',
                        transitionEnterActive: 'transition-enter-active',
                        transitionExit: 'transition-exit-active',
                        transitionExitActive: 'transition-exit-active',
                        }}
                        animationDuration={1000}>
                    <br/>
                    <form>
                    <h4>Maintenance Form for {this.state.tenantName}</h4>
                    <h4>at Address {this.state.propertyAddress}</h4>
                        <br/>
                    <p>Please briefly describe your maintenance issue in the box below. You will be contacted within one business day after the issue is submitted.  
                      If it is an emergency please call 970-555-6969</p>
                    <textarea className="form-control" id="maintenance-body" rows="6"></textarea>
                        <br/>
                    <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </Modal>
            </div>


          </Panel>

        </div>
      </div>
    );
  }
}

export default Profile;
