import React, { Component } from "react";
import Button from "./Button";
import controlButton from "./controlButton";
export default class Gameboard extends Component {
  render() {
    return (
      <div className="board">
        <div className="row">
          <Button buttonStyle={"green"} />
          <Button buttonStyle={"red"} />
        </div>
        <div id="panel">
          <h1>Simon</h1>
          <div className="container">
            <div className="gameboard" />
            <controlButton className="controls" />
            <controlButton className="controls" />

          </div>
          <div className="text-container">
            <p>Start</p>
            <p>Strict</p>
          </div>
        </div>
        <div className="row">
          <Button buttonStyle={"blue"} />
          <Button buttonStyle={"yellow"} />
        </div>
      </div>
    );
  }
}
