const express = require('express');
const PORT = 3000;
const app = express();
const usersRouter = require('./routes/users.router');
const postsRouter = require('./routes/posts.router');
const path = require('path');
const { default: mongoose } = require('mongoose');

app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${req.method} ${req.url}`);
  next();
  const diffTime = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${diffTime}ms`);
});

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
  res.render('index', {
    imageTitle: 'It is a cat!',
    hello: 'Hello~',
  });
});

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://autumnly1007:<password>@cluster0.sztrze6.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log('실행 완료');
});
