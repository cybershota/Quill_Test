const model = require('../model/getModel');

const getController = {
  getPost: (req, res) => {
    console.log('controller id====>', req.params.id);
    const id = req.params.id;
    model.getPost(id, (err, result) => {
      if (err) return console.log(err);
      console.log('controller');
      console.log('得到結果', result);
      res.setHeader('Content-Type', 'application/json');
      res.json(result);
    });
  },
};

module.exports = getController;
