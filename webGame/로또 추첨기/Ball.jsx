import React, { memo } from 'react';

// state를 안 쓰는 경우 함수로 만들수 있다.
// hooks는 useState 같은 것을 쓰는 것을 훅스라고 함.
// 대신 함수는 퓨어컴포넌트로 만들고 싶다면 memo를 사용

const Ball = memo(({ number }) => {
  let background, color;

  if (number <= 10) {
    background = 'red';
  } else if (number <= 20) {
    background = 'orange';
  } else if (number <= 30) {
    background = 'yellow';
  } else if (number <= 40) {
    background = 'blue';
    color = 'white';
  } else {
    background = 'green';
  }

  return (
    <div className="ball" style={{ background, color }}>
      {number}
    </div>
  );
});

/* 
class Ball extends PureComponent {
  render(){
    const { number } = this.props;
    let background;

    if(number <= 10){
      background = 'red';
    }else if( number <= 20) {
      background = 'orange';
    }else if(number <= 30){
      background = 'yellow';
    }else if (number <= 40){
      background = 'blue'
    }else {
      background = 'green';
    }

    return (
      <div className='ball' style={{ background }}>{ number }</div>
    );
  }
}
 */
export default Ball;
