import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { QuillReview } from '../QuillReview';

export function Review() {
  let { id } = useParams();

  return (
    <Fragment>
      <h1>預覽頁</h1>
      <QuillReview id={id} />
    </Fragment>
  );
}
