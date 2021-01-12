import React, { useState } from 'react';
import styled from 'styled-components';

const CommentCard = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: flex-start;
  max-width: 200px;
  width: 200px;
  border-radius: 8px;
  border: 1px solid black;
  padding: 5px 0;
  z-index: 3;
  background: white;
  margin: 0 0 4px 0;
  align-self: flex-start;

  & .review-card-info {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;

    & img {
      border: 1px solid pink;
      border-radius: 50px;
      max-width: 30px;
      max-height: 30px;
      margin: 3px 5px;
    }

    & p {
      font-size: 14px;
      font-weight: bold;
    }
  }

  & textarea {
    width: 90%;
    margin: auto;
    resize: none;
    outline: none;
    border: none;
  }

  & .button-group {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;

    & button {
      margin: 10px 7px;
    }
  }
`;

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  z-index: 1;
`;

export function CommentBlock({ comment }) {
  return (
    <>
      <CommentCard>
        <div className={'review-card-info'}>
          <img src={'https://i.imgur.com/sW6aO14.png'} alt={'avatar'}></img>
          <p>Maria</p>
        </div>
        <textarea rows={5} readOnly={true} value={comment}></textarea>
        <div className={'button-group'}>
          <button>刪除</button>
        </div>
      </CommentCard>
    </>
  );
}
