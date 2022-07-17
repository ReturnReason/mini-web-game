// import React, { Component } from 'react';
// import style from './styles/style.css';

function newGame() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];

  for (let i = 0; i < 4; i++) {
    array.push(candidate.splice(Math.floor(Math.random() * 9 - i), 1)[0]);
  }
  return array;
}

class NumberBaseball2 extends Component {
  state = {
    userInputValue: '',
    quiz: newGame(),
    result: [],
  };

  inputRef;

  onRefInput = (c) => {
    this.inputRef = c;
  };

  timer = () => {
    setTimeout(() => {
      this.setState({
        userInputValue: '',
        quiz: newGame(),
        result: [],
      });
    }, 3000);
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.userInputValue === '') {
      alert('값을 입력해주세요!');
      this.inputRef.focus();
      return;
    }

    const currentQuiz = [...this.state.quiz];
    let currentResult = '';

    // 현재 문제 정답을 string으로 타입 변환 뒤 + 연산하여 문자 이어붙이기
    currentQuiz.forEach((v) => {
      currentResult += v.toString();
    });

    if (this.state.result.length >= 10) {
      this.timer();
      this.setState({
        result: [...this.state.result, { comment: `10회 도전했으나 실패하여 3초 후 새게임을 시작합니다.` }],
        quiz: newGame(),
        userInputValue: '',
      });
      alert('10회 도전했으나 실패하여 3초 뒤 새게임을 시작합니다.');
    } else {
      if (currentResult === this.state.userInputValue) {
        this.setState({
          result: [],
          quiz: newGame(),
          userInputValue: '',
        });

        alert('홈런! 새 게임을 시작합니다.');
      } else {
        let strike = 0;
        let ball = 0;

        for (let i = 0; i < 4; i++) {
          if (currentResult[i] === this.state.userInputValue[i]) {
            strike += 1;
          } else if (this.state.userInputValue.includes(currentResult[i])) {
            ball += 1;
          }
        }

        this.setState({
          result: [...this.state.result, { answer: this.state.userInputValue, comment: `${strike} 스트라이크, ${ball} 볼 입니다!` }],
          userInputValue: '',
        });
      }
    }
  };

  onChange = (e) => {
    this.setState({
      userInputValue: e.target.value,
    });
  };

  render() {
    return (
      <div className="bg">
        <h2 className="title">
          <span className="baseball-icon">⚾</span> 숫자 야구 게임 <span className="baseball-icon">⚾</span>
        </h2>
        <p className="sub-text">1 ~ 9 중 4가지 숫자를 입력하세요.</p>
        <form className="game-container" onSubmit={this.onSubmit}>
          <input ref={this.onRefInput} minLength="4" maxLength="4" onChange={this.onChange} value={this.state.userInputValue} className="input-box" type="text" />
          <button className="btn">확인</button>
        </form>
        <ul className="result-container">
          {this.state.result.map((v, i) => {
            return (
              <li key={`${i}번째 도전`}>
                {' '}
                {v.answer} ▶ {v.comment}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default NumberBaseball2;
