const model = require('../model/postModel');

const postController = {
  addPost: (req, res) => {
    const content = req.body;
    console.log('勁道 Server 的=====>', req.body);
    model.create(content, (err) => {
      if (err) return console.log(err);
      res.json({ message: '💪' });
    });
  },
};

module.exports = postController;
