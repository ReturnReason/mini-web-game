import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candiate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];

  while (candiate.length > 0) {
    shuffle.push(candiate.splice(Math.floor(Math.random() * candiate.length), 1)[0]);
  }

  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeouts = [];

  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };

  runTimeouts = () => {
    const { winNumbers } = this.state;

    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return { winBalls: [...prevState.winBalls, winNumbers[i]] };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  };

  componentDidMount() {
    this.runTimeouts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
  }

  componentWillUnmount() {
    this.timeouts.forEach((t) => {
      clearTimeout(t);
    });
  }

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="result">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한번 더!</button>}
      </>
    );
  }
}

// 반복문을 기점으로 컴포넌트를 많이 분류한다.
// 제일 마지막에 있는 자식 컴포넌트는 퓨어 컴포넌트로 만드는 경우가 많다. (데이터보다 화면을 담당하는 경우가 많으므로)

export default Lotto;
