const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cookieParser());

const posts = [
  {
    username: 'John',
    title: 'Post 1',
  },
  {
    username: 'Han',
    title: 'Post 2',
  },
];

app.get('/posts', authMiddleware, (req, res) => {
  res.json(posts);
});

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzU4NTc5NjB9.LOKj3huec8FVRTPuKf1oS2kBxaoDnCpkFxyumlekYFI
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'superSecret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const refreshTokens = [];

app.post('/login', (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  const accessToken = jwt.sign(user, 'superSecret', { expiresIn: '30s' });
  const refreshToken = jwt.sign(user, 'superSecret', { expiresIn: '1d' });

  refreshTokens.push(refreshToken);

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken });
});

app.get('/refresh', (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, 'superSecret', (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign({ name: user.name }, 'superSecret', { expiresIn: '30s' });
    res.json({ accessToken });
  });
});

app.listen(4000, () => {
  console.log('listening on port 4000');
});
