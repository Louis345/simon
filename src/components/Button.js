import React, { Component } from "react";
import { playButtonSound } from "../utils/helpers";
import ReactDOM from "react-dom";
export default class Button extends Component {
  render() {
    return (
      <div
        ref="myTextInput"
        className={this.props.class ? this.props.class.join(" ") : "buttons"}
        id={this.props.buttonStyle}
        onClick={() => {
          const { buttonPressSound, pauseGame } = this.props;
          this.props.onClick();
          if (pauseGame) {
            playButtonSound(buttonPressSound);
          }
        }}
      />
    );
  }
}
