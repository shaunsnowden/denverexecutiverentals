import React from "react";
import "./rCard.css";
import Modal from 'react-responsive-modal';
import MapCard from "../MapCard/MapCard";


export default class RCard extends React.Component {
    state = {
      open: false
    };
    
    // modal functions
    onOpenModal = () => {
      this.setState({ open: true });
    };
   
    onCloseModal = () => {
      this.setState({ open: false });
    };

   
    render() {

        const { open } = this.state;

        let occupationStatus;
        let occupationStatusModal;
        let url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${parseFloat(this.props.lat)},${parseFloat(this.props.lng)}&heading=0&pitch=0&fov=80"`;
        
        if (this.props.occupied === false) {
            occupationStatus = "Vacancy";
            occupationStatusModal = "This residence is currently vacant! Contact us at (970)555-1010 or denverrentz@jeemail.com to inquire about leasing opportunities."
        } else if (this.props.occupied === true) {
            occupationStatus = "";
        }

        return(
        // individual card
        <div className = "rcard">
            <div className = "img-container" id ={this.props.id}>
                <img alt={this.props.name} src={this.props.image} onClick={this.onOpenModal}  />
                
                {/* animated modal */}
                <Modal open={open} onClose={this.onCloseModal} little
                    classNames={{
                    transitionEnter: 'transition-enter',
                    transitionEnterActive: 'transition-enter-active',
                    transitionExit: 'transition-exit-active',
                    transitionExitActive: 'transition-exit-active',
                    }}
                    animationDuration={1000}>

                    {/* quick fix for bootstrap messing up the X-button in the modal */}
                    <p style={{color:"white"}}>i</p>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <h3>{this.props.name}</h3>
                                <br/>
                                <img alt={this.props.name} src={this.props.image} style={{height: "250px", width: "300px"}} />
                                <p><a href={url} target="_blank">Click for Google Street View</a></p>
                                <br/>
                                <br/>
                                <p>{this.props.address}</p>
                                
                                <span>{occupationStatusModal}</span>
                            </div>
                            <div className="col-md-6">
                                <MapCard 
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
                            </div>
                        </div>
                    </div>
                        

                </Modal>
            </div>
            <div className="content">
                <span>{this.props.name}</span><br/>
                <span id="is-occupied">{occupationStatus}</span>
            </div>
        </div>
        );
        
    }
}
