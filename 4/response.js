function decrypt(data) {
  return 'decrypted data';
}

function read() {
  return decrypt('qwertyuiopasdfghjkl');
}

// 모듈 캐싱으로 인해 1번만 출력됨
console.log('In reponse module');

module.exports = {
  decrypt,
  read,
};
