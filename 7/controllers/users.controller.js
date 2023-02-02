const users = require('../models/users.model');

function getUsers(req, res) {
  res.json(users);
}

function getUser(req, res) {
  const userId = Number(req.params.userId);
  const user = users[userId];
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: 'No User Found' });
  }
}

function postUser(req, res) {
  if (!req.body.name) {
    return res.status(400).json({
      error: 'Missing user name',
    });
  }
  const newUser = {
    id: users.length,
    name: req.body.name,
  };
  users.push(newUser);
  res.json(users);
}

module.exports = {
  getUsers,
  getUser,
  postUser,
};
