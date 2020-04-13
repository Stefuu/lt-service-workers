const post = require('../__fixtures__/post.js')

module.exports = (req, res) => {
  res.json(post)
}
