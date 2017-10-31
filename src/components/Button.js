import React, { Component } from "react";

export default class Button extends Component {
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
