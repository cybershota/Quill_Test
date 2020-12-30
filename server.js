const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db');
const postController = require('./controller/postController');
const getController = require('./controller/getController');

// 解析 URL 資料
app.use(bodyParser.urlencoded({ extended: false }));
// 解析 JSON 資料
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: '後端已連線' });
});

app.get('/api/:id', getController.getPost);

app.post('/api/new', postController.addPost);

app.listen(5000, () => {
  db.connect();
  console.log('✅ Running on Node.js');
});
