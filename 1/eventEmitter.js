const EventEmitter = require('events');

const celebrity = new EventEmitter();

// update post 이벤트 발생 시 콜백 함수 실행
celebrity.on('update post', (type) => {
  console.log(`This ${type} post is good`);
});

celebrity.on('update post', () => {
  console.log('This post is awesome');
});

// celebrity가 update post 이벤트를 발생시킴
celebrity.emit('update post', 'image');
