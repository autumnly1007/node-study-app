const path = require('path');
function getPost(req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'images', 'test-image.jpg'));
}

module.exports = {
  getPost,
};
