import React, { useState, useEffect, useRef, Fragment } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
// Component
import { ReviewBlock } from './ReviewBlock';
import { CommentBlock } from './CommentBlock';

let key = 0;

// styledComponent
const Wrapper = styled.div`
  width: 850px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-start;
  margin: auto;
`;

const SideBar = styled.div`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 16px;
  margin-bottom: 16px;
  width: 220px;
  min-height: 1000px;
  overflow-y: scroll;
`;

// fetch 原始文章
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

// Blot 似乎用不到了，好像會造成問題
// const customDataFormat = ReactQuill.Quill.import('blots/inline');
// class EmphBlot extends customDataFormat {
//   static create(value) {
//     let node = super.create(value);
//     node.setAttribute('style', `background:#F9ADAD;display:inline;`);
//     return node;
//   }
// }

// EmphBlot.blotName = 'reviewed';
// EmphBlot.tagName = 'div';
// // EmphBlot.className = 'review-comment-line';
// ReactQuill.Quill.register('formats/reviewed', EmphBlot);

const Parchment = ReactQuill.Quill.import('parchment');
const reviewStyleAttributor = new Parchment.Attributor.Attribute('background', 'style', {
  scope: Parchment.Scope.INLINE,
});
const reviewIdAttributor = new Parchment.Attributor.Attribute('review-id', 'data-reviewid', {
  scope: Parchment.Scope.INLINE,
});
const commentIdAttributor = new Parchment.Attributor.Attribute('comment-id', 'data-commentid', {
  scope: Parchment.Scope.INLINE,
});
ReactQuill.Quill.register(reviewStyleAttributor);
ReactQuill.Quill.register(reviewIdAttributor);
ReactQuill.Quill.register(commentIdAttributor);

const modules = {
  toolbar: [[{ background: '#d8f9ad' }], ['clean']],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'reviewed',
  'review-id',
  'comment-id',
  'background',
];

export function QuillReview({ id }) {
  const [value, setValue] = useState({});
  const [selection, setSelection] = useState({ index: 0, length: 0 });
  const [commentInputUI, setCommentInputUI] = useState({ show: false, position: 0 });
  const [commentDatas, setCommentDatas] = useState([]);

  useEffect(() => {
    // console.log('Review id', id);
    getData(id).then((data) => {
      // console.log(data);
      setValue(JSON.parse(data));
    });
  }, [id]);

  const reviewEditorRef = useRef();

  function handleAnnotation(range, source, editor) {
    const myEditor = reviewEditorRef.current.getEditor();
    // console.log(myEditor);
    if (range === null || range.length === 0) return;
    console.log(range);
    // const selectText = myEditor.getText(range.index, range.length);
    // console.log('選擇', selectText);
    // console.log(myEditor);
    const position = myEditor.getBounds(range.index, range.length);
    console.log('position', position);
    setSelection((prevState) => ({
      ...prevState,
      index: range.index,
      length: range.length,
    }));
    setCommentInputUI((prevState) => ({
      ...prevState,
      show: true,
      position: position.top,
    }));
    // myEditor.format('reviewed', 'true');

    myEditor.formatText(range.index, range.length, 'background', 'background:#d8f9ad');
    myEditor.formatText(range.index, range.length, 'review-id', 'zangwang');
    myEditor.formatText(range.index, range.length, 'comment-id', '1234');
    console.log(myEditor.getContents());
    setValue(myEditor.getContents());
    setSelection({ index: 0, length: 0 });
  }

  function handleAddComment(comment) {
    setCommentDatas((prevState) => [
      ...prevState,
      {
        key: key++,
        comment: comment,
      },
    ]);
    setSelection({ index: 0, length: 0 });
  }

  function handleDeleteAnnotation() {
    const myEditor = reviewEditorRef.current.getEditor();
    myEditor.formatText(selection.index, selection.length, 'reviewed', false);
    myEditor.formatText(selection.index, selection.length, 'review-id', '');
    myEditor.formatText(selection.index, selection.length, 'comment-id', '');
    setCommentInputUI((prevState) => ({
      ...prevState,
      show: false,
      position: 0,
    }));
    setValue(myEditor.getContents());
    setSelection({ index: 0, length: 0 });
  }

  return (
    <Fragment>
      <h4>評論</h4>
      <Wrapper>
        <ReactQuill
          ref={reviewEditorRef}
          theme='bubble'
          value={value}
          modules={modules}
          onChangeSelection={handleAnnotation}
          readOnly={true}
          formats={formats}
        />
        <SideBar>
          {commentInputUI.show && (
            <ReviewBlock
              isVisible={setCommentInputUI}
              position={commentInputUI.position}
              handleDeleteAnnotation={handleDeleteAnnotation}
              handleAddComment={handleAddComment}
            />
          )}
          {commentDatas.length > 0 &&
            commentDatas.map((data) => <CommentBlock key={data.key} comment={data.comment} />)}
        </SideBar>
      </Wrapper>
    </Fragment>
  );
}
