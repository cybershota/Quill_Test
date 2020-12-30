import React, { useState, useEffect, Fragment } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function getData(id) {
  return new Promise((resolve, reject) => {
    fetch(`/api/${id}`, {
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      });
  });
}

export function QuillReview({ id }) {
  const [value, setValue] = useState({});

  useEffect(() => {
    console.log('Review id', id);
    getData(id).then((data) => {
      console.log(data);
      setValue(JSON.parse(data));
    });
  }, [id]);

  return (
    <Fragment>
      <h4>測試</h4>
      <ReactQuill theme='bubble' value={value} defaultValue={value} readOnly={true} />
    </Fragment>
  );
}
