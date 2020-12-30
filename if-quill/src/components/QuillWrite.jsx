import React, { useState, Fragment } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { SaveBtn } from './SaveBtn';

export function QuillWrite() {
  const [value, setValue] = useState('');
  const [paragraph, setParagraph] = useState('');

  function handleOnchange(content, delta, source, editor) {
    setValue(content);
    setParagraph(editor.getContents());
  }

  return (
    <Fragment>
      <ReactQuill
        theme='snow'
        value={value}
        onChange={handleOnchange}
        placeholder={'開始寫作吧...'}
      />
      <SaveBtn paragraph={paragraph} />
    </Fragment>
  );
}
