import React, { Component } from "react";

export default class PopUp extends Component {
  handleClick = () => {
    console.log("handleclick");
    this.props.toggle();
  };

  render() {
    return (
      <div className="modal_content">
        <span className="close" onClick={this.handleClick}>
          &times;
        </span>
        <p>{this.props.description}</p>
      </div>
    );
  }
}
