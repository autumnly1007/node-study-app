const process = require('process');
let count = 0;

const cb = () => {
  console.log(`Processing nextTick cd ${++count}`);

  // 재귀 호출 되더라도 이벤트 루프를 차단하지 않음
  // 재귀 호출 중간에 setTimeout이 실행됨
  setImmediate(cb);
};

setTimeout(() => {
  console.log(`setTimeout excuted`);
}, 100);

// 이벤트 루프 시작 시, 이벤트 루프 각 단계 사이에 처리
process.nextTick(cb);

console.log('start');
