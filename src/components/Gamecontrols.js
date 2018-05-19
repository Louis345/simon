import React, { Component } from "react";

export default class GameControls extends Component {
  render() {
    const { className } = this.props;
    return (
      <div
        className="controls"
        id={typeof className === "strict" ? "strict" : null}
        onClick={() => this.props.onClick()}
      />
    );
  }
}
