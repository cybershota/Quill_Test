const db = require('../db');

const model = {
  getPost: (id, cb) => {
    db.query('SELECT * FROM posts WHERE id = ?', [id], (err, results) => {
      if (err) return cb(err);

      const data = JSON.parse(JSON.stringify(results[0].content));

      cb(null, data);
    });
  },
};

module.exports = model;
