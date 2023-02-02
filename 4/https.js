const request = require('./request');
const { read } = require('./response');
const { decrypt } = require('./response');

// 모듈 시스템이 복잡해지기 때문에 좋지 않은 방법
// const lib = require('./lib');

function makeRequest(url, data) {
  // 암호화한 후 요청을 보내기
  request.send(url, data);

  // 복호화한 응답을 return 하기
  return read();
}

// console.log(require);

const responseData = makeRequest('https://naver.com', 'any data');
console.log(responseData);
// encrypted data is being sent to https://naver.com
// decrypted data
