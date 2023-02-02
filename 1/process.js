const process = require('process');

process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code', code);
});

// 이벤트를 발생시키지 않아도 내부적으로 beforeExit 이벤트가 발생함
// process.emit('beforeExit', 0);
