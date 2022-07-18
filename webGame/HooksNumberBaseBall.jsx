import React, { useState, useRef } from 'react';

function HooksNumberBaseball() {
  const inputRef = useRef();
  const [userAnswer, setUserAnswer] = useState('');
  const [quiz, setQuiz] = useState(newQuiz);
  const [result, setResult] = useState([]);

  /** 사용자가 input 입력시 state 변경 **/
  const onChange = (e) => {
    setUserAnswer(e.target.value);
  };

  /** 사용자가 정답 제출하면 실행되는 함수 **/
  const onSubmit = (e) => {
    e.preventDefault();

    const currentQuiz = quiz.join('');
    checkAnswer(currentQuiz, userAnswer);

    // 10회 초과 입력시
    if (result.length >= 10) {
      alert('10회를 초과하여 게임을 재실행합니다.');
      alert(`정답은 ${quiz.join('')} 였습니다.`);
      setQuiz(newQuiz());
      setUserAnswer('');
      setResult([]);
    }

    setUserAnswer('');
    inputRef.current.focus();
  };

  /** 사용자가 입력한 정답과 실제 퀴즈 정답이 맞는지 비교하는 함수 **/
  function checkAnswer(quiz, userAnswer) {
    const check = isNumber();
    if (check) {
      if (quiz === userAnswer) {
        setResult((prev) => {
          return [...prev, { condition: `홈런!` }];
        });
        alert('홈런!🎉🎉');
        alert('새로운 게임을 시작합니다!');
        setUserAnswer('');
        setQuiz(newQuiz());
        setResult([]);
      } else {
        let strike = 0;
        let ball = 0;

        for (let i = 0; i < quiz.length; i++) {
          // 문제와 숫자, 위치가 일치하면
          if (quiz[i] === userAnswer[i]) {
            strike += 1;
          } else {
            // 위치는 다르지만 숫자는 일치하면
            if (quiz.includes(userAnswer[i])) {
              ball += 1;
            }
          }
        }
        setResult([...result, { inputvalue: userAnswer, condition: `${strike} 스트라이크, ${ball} 볼 입니다.` }]);
      }
    }
  }

  /** 게임 문제를 만드는 함수 **/
  function newQuiz() {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const arr = [];

    for (let i = 0; i < 4; i++) {
      arr.push(candidate.splice(Math.floor(Math.random() * 9) - i, 1)[0]);
    }

    return arr;
  }

  /* 사용자가 숫자를 입력했는지 확인 */
  function isNumber() {
    if (isNaN(userAnswer)) {
      alert('숫자만 입력하세요.');
      return false;
    } else if (userAnswer == '') {
      alert('공백입니다.');
      return false;
    }
    return true;
  }

  return (
    <div className="bg">
      <h2 className="title">
        <span className="baseball-icon">⚾</span> 숫자 야구 게임 <span className="baseball-icon">⚾</span>
      </h2>
      <p className="sub-text">1 ~ 9 중 4가지 숫자를 입력하세요.</p>
      <form onSubmit={onSubmit} className="game-container">
        <input value={userAnswer} onChange={onChange} ref={inputRef} minLength="4" maxLength="4" className="input-box" type="text" />
        <button className="btn">확인</button>
      </form>
      <ul className="result-container">
        {result.map((v, index) => {
          return (
            <li key={`${index}번째 트라이`}>
              <p>입력 값 : {v.inputvalue}</p>
              {index + 1} 번째 시도 : {v.condition}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HooksNumberBaseball;
