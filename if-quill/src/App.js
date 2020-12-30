import React, { useEffect } from 'react';
import './App.css';
// Router
import { Switch, Route, useLocation, useParams } from 'react-router-dom';
// 文字編輯器 Quill
// import { Quill } from './components/Quill';
// Component
import { Writing } from './components/pages/Writing';
import { Review } from './components/pages/Review';

function App() {
  // 後端連線測試
  // useEffect(() => {
  //   fetch('/', { method: 'GET' })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((message) => {
  //       console.log(message);
  //     });
  // }, []);

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/write'>
          <Writing />
        </Route>
        <Route path='/review/:id'>
          <Review />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
