import React from "react";
import "./rCard.css";
import Modal from 'react-responsive-modal';



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
                                <br/>
                                <br/>
                                <p>{this.props.address}</p>
                                
                                <span>{occupationStatusModal}</span>
                            </div>
                            <div className="col-md-6">
                                <h1>Map Goes Here</h1>
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
