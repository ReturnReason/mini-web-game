import React, { Component } from 'react';

const imgCoordinates = {
  rock: '0',
  paper: '-284px',
  scissors: '-142px',
};

const rspScore = {
  rock: 0,
  paper: 1,
  scissors: -1,
};

class RSP extends Component {
  state = {
    score: 0,
    result: '',
    imgLocation: '0',
  };

  interval;

  componentDidMount() {
    this.interval = setInterval(this.startGame, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startGame = () => {
    const { imgLocation } = this.state;
    if (imgLocation === imgCoordinates.rock) {
      this.setState({
        imgLocation: imgCoordinates.scissors,
      });
    } else if (imgLocation === imgCoordinates.scissors) {
      this.setState({
        imgLocation: imgCoordinates.paper,
      });
    } else if (imgLocation === imgCoordinates.paper) {
      this.setState({
        imgLocation: imgCoordinates.rock,
      });
    }
  };

  computerPick = (location) => {
    return Object.entries(imgCoordinates).find((v) => {
      return v[1] === location;
    })[0];
  };

  rspChoice = (userPick) => () => {
    clearInterval(this.interval);
    // 바위 0 가위 -1 보 1
    const { imgLocation } = this.state;
    const userScore = rspScore[userPick];
    const computerScore = rspScore[this.computerPick(imgLocation)];
    const diff = userScore - computerScore;

    console.log(diff);
    if (diff === 0) {
      this.setState({
        result: '무승부',
      });
    } else if (diff === -2 || diff === 1) {
      this.setState((prev) => {
        return {
          result: '승!',
          score: prev.score + 1,
        };
      });
    } else {
      this.setState((prev) => {
        return {
          result: '패ㅠㅠ!',
          score: prev.score - 1,
        };
      });
    }

    setTimeout(() => {
      clearInterval(this.interval);
      this.interval = setInterval(this.startGame, 100);
    }, 2000);
  };

  render() {
    const { result, imgLocation, score } = this.state;

    return (
      <>
        <div>
          <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgLocation} 0` }}></div>
          <button onClick={this.rspChoice('rock')}>바위</button>
          <button onClick={this.rspChoice('scissors')}>가위</button>
          <button onClick={this.rspChoice('paper')}>보</button>
          <p>{result}</p>
          <p>점수 : {score}</p>
        </div>
      </>
    );
  }
}

export default RSP;
