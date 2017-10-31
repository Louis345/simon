import React, { Component } from "react";

export default class controlButton extends Component {
  render() {
    return (
      <div
        className="buttons"
        id={this.props.buttonStyle}
        onClick={() => console.log("clicked")}
      />
    );
  }
}
