const db = require('../db');

const model = {
  create: (content, cb) => {
    console.log('=======>', content);
    const data = JSON.stringify(content);
    db.query('INSERT INTO posts (content) VALUES(?)', [data], (err, result) => {
      if (err) return cb(err);
      cb(null);
    });
  },
};

module.exports = model;
