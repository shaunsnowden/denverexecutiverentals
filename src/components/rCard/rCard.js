import React from "react";
import "./rCard.css";
import Modal from 'react-responsive-modal';
import ReactDOM from 'react-dom';

export default class RCard extends React.Component {
    state = {
      open: false,
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
                <h2>{this.props.name}</h2>
                <img alt={this.props.name} src={this.props.image} style={{height: "300px", width: "400px"}} />
                <p>{this.props.description}</p>
                </Modal>
            </div>
            <div className="content">
                <span>{this.props.name}</span>
            </div>
        </div>
        );
        
    }
}
