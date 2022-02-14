import React, { Component } from "react";
import Button from "./Button";
import GameControls from "./GameControls";
import ReactDOM from "react-dom";
import { playButtonSound, shuffle } from "../utils/helpers";
export default class Gameboard extends Component {
  state = {
    green: ["buttons"],
    red: ["buttons"],
    yellow: ["buttons"],
    blue: ["buttons"],
    computerMoves: [],
    playerMoves: [],
    loading: true,
    count: "",
    pauseGame: false,
    successfullMoves: 1,
    successfullPress: 0,
    blink: false,
    color: [],
    player1: false,
    buttonPress: 0,
    strict: null,
    gameMode: false
  };

  recordPlayerMoves = playerMoves => {
    if (this.state.pauseGame !== false) {
      this.setState(
        {
          playerMoves: [...this.state.playerMoves, playerMoves]
        },
        () => {
          let result = this.compareMoves();

          if (result === false) {
            if (this.state.strict) {
              this.resetPlayerMoves();
            } else {
              this.computerMoveTracker(false);
            }
          }
          if (result === true) {
            this.computerMoveTracker(true);
          }
        }
      );
    }
  };
  simonOn = () => {
    // run lights to indicate the system is loading
    const { gameMode } = this.state;

    if (gameMode) {
      this.setState(
        {
          loading: false,
          count: 0,
          playerMoves: [],
          pauseGame: false,
          successfullMoves: 1
        },
        () => {
          this.computerMove(this.state.successfullMoves).then(value => {
            setTimeout(() => {
              this.setState({
                pauseGame: true,
                player1: true
              });
            }, 1600);
          });
        }
      );
    }
  };
  compareMoves = () => {
    const { playerMoves } = this.state;
    const { computerMoves } = this.state;
    const { successfullMoves } = this.state;
    const { count } = this.state;

    let cpuArrMoves = computerMoves.slice(0, playerMoves.length);
    let result = this.state.computerMoves.filter((moves, idx) => {
      return playerMoves.indexOf(moves) === idx;
    });

    if (computerMoves.length === playerMoves.length) {
      return cpuArrMoves.toString() === playerMoves.toString();
    } else {
      if (cpuArrMoves.toString() !== playerMoves.toString()) {
        return false;
      }
    }

    if (successfullMoves !== this.state.count) {
      return cpuArrMoves.toString() === playerMoves.toString();
    }
  };
  generateMoves = (moves, callback) => {
    const { color } = this.state;
    let colorSelect = ["blue", "green", "yellow", "red"];
    let randomNumber = Math.round(Math.random() * 3);
    for (let i = 0; i <= moves; i++) {
      if (!color[this.state.count]) {
        color.push(colorSelect[randomNumber]);
      }
    }

    this.setState(
      {
        computerMoves: color
      },
      () => {
        callback();
      }
    );
  };
  computerMove = async n => {
    for (let i = 0; i < n; i++) {
      const t = Math.random() * 1000;
      const x = await new Promise(r => setTimeout(r, 1000, i));

      if (this.state.pauseGame === false) {
        this.generateMoves(n, () => {
          this.activateButton(this.state.computerMoves[i]);
        });
      }
    }
  };
  computerMoveTracker = status => {
    let moveTrack = status ? 1 : 0;
    this.setState(
      {
        playerMoves: [],
        computerMoves: [],
        successfullMoves: this.state.successfullMoves + moveTrack,
        pauseGame: false,
        count: 0,
        buttonPress: this.state.buttonPress + moveTrack
      },
      () => {
        this.computerMove(this.state.successfullMoves).then(value => {
          setTimeout(() => {
            this.setState({
              pauseGame: true,
              playerMoves: []
            });
          }, 1600);
        });
      }
    );
  };
  resetGame = () => {
    this.setState({
      pauseGame: false,
      playerMoves: [],
      computerMoves: [],
      successfullMoves: 1,
      player1: false,
      color: []
    });
  };
  resetPlayerMoves = () => {
    this.setState(
      {
        count: 0,
        pauseGame: false,
        playerMoves: [],
        computerMoves: [],
        successfullMoves: 1,
        player1: false,
        color: []
      },
      () => {
        this.setBlinks(10).then(value => {
          this.setState(
            {
              pauseGame: false,
              playerMoves: [],
              computerMoves: [],
              successfullMoves: 1,
              count: 0
            },
            () => {
              this.computerMove(this.state.successfullMoves).then(value => {
                setTimeout(() => {
                  this.setState({
                    pauseGame: true,
                    player1: true
                  });
                }, 1600);
              });
            }
          );
        });
      }
    );
  };
  setBlinks = counter => {
    let timeCounter = 0;
    let promiseA = new Promise((resolve, reject) => {
      let clearTimer = setInterval(() => {
        timeCounter++;
        let blinker = this.state.blink ? "--" : " ";

        let count = true;
        this.setState({
          count: blinker,
          blink: !this.state.blink
        });
        if (timeCounter >= counter) {
          clearInterval(clearTimer);
          resolve(true);
        }
      }, 500);
    });
    return promiseA;
  };
  strictOn = () => {
    this.setState({
      strict: !this.state.strict
    });
  };
  activateButton = button => {
    if (!Number.isInteger(this.state.count)) {
      this.setState({
        count: 1
      });
    }
    setTimeout(() => {
      if (this.state.pauseGame === false) {
        this.setState(
          {
            [button]: ["buttons", `${button}-active`],
            count: this.state.count + 1
          },
          () => playButtonSound(null, button)
        );
      }
      setTimeout(() => {
        this.setState({
          [button]: ["buttons"]
        });
      }, 500);
    }, 1000);
    if (this.state.count === 20) {
      this.resetGame();
    }
  };

  render() {
    return (
      <div className="board">
        <div className="row">
          <Button
            buttonStyle={this.state.pauseGame ? "green1" : "green"}
            pauseGame={this.state.pauseGame}
            onClick={() => this.recordPlayerMoves("green")}
            class={this.state.green}
            buttonPressSound={
              "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
            }
            loading={this.state.loading}
          />
          <Button
            onClick={() => this.recordPlayerMoves("red")}
            class={this.state.red}
            buttonPressSound={
              "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
            }
            loading={this.state.loading}
            pauseGame={this.state.pauseGame}
            buttonStyle={this.state.pauseGame ? "red2" : "red"}
          />
        </div>
        <div id="panel">
          <h1>Simon</h1>
          <div id="onIcon">
            <div
              id={
                this.state.strict === true
                  ? "onIconScreen-active"
                  : "onIconScreen"
              }
            />
          </div>
          <div className="container">

            <div className="gameboard">
              <p className="scoreFont">{this.state.count}</p>
            </div>
            <GameControls onClick={this.simonOn} />
            <GameControls onClick={this.strictOn} />

          </div>
          <div className="text-container">
            <p>Start</p>
            <p>Strict</p>
          </div>
          <div
            className="game-switch-container"
            onClick={() => {
              const { gameMode } = this.state;
              this.setState(
                {
                  gameMode: !gameMode,
                  count: gameMode === true ? "" : "--"
                },
                () => {
                  if (gameMode === true) {
                    this.resetGame();
                  }
                }
              );
            }}
          >
            <span>Off</span>
            <div
              className={this.state.gameMode ? "game-switch-on" : "game-switch"}
            >
              <div className="game-switch-button" />
            </div>
            <span>On</span>
          </div>

        </div>
        <div className="row">
          <Button
            buttonStyle={this.state.pauseGame ? "blue2" : "blue"}
            pauseGame={this.state.pauseGame}
            onClick={() => this.recordPlayerMoves("blue")}
            class={this.state.blue}
            buttonPressSound={
              "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
            }
            loading={this.state.loading}
          />
          <Button
            buttonStyle={this.state.pauseGame ? "yellow2" : "yellow"}
            pauseGame={this.state.pauseGame}
            onClick={() => this.recordPlayerMoves("yellow")}
            class={this.state.yellow}
            buttonPressSound={
              "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
            }
            loading={this.state.loading}
          />
        </div>
      </div>
    );
  }
}
