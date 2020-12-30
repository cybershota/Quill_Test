import React from 'react';

export function SaveBtn({ paragraph, html }) {
  function saveContent(e) {
    e.preventDefault();
    console.log(paragraph);
    console.log(html);
    const data = JSON.stringify(paragraph);
    fetch('/api/new', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      });
  }

  return <button onClick={saveContent}>儲存</button>;
}
