import React, {FC, useState} from 'react';
import {Comment} from './Comments';
import firebase from './firebase/clientApp';
import styles from '../styles/ReplyForm.module.css';

interface ReplyFormProps {
  path: string;
  author: string;
  parent?: Comment;
  isPost?: boolean;
}

const ReplyForm: FC<ReplyFormProps> = ({path, author, parent, isPost}) => {
  const [show, setShow] = useState(isPost || false);
  const [option, setOption] = useState('+');
  const [value, setValue] = useState(0);
  const db = firebase.firestore();

  const postComment = async () => {
    await db.collection('comments').add({author, comment: value, date: new Date()});
  };

  console.log(path);

  const reply = async () => {
    const newValue = (option: string) => {
      if (parent) {
        switch (option) {
          case '+':
            return parent.comment + value;
          case '-':
            return parent.comment - value;
          case '*':
            return parent.comment * value;
          case '/':
            return parent.comment / value;
        }
      }
    }
    await db.collection('comments').doc(path).update({comments: [{author, comment: newValue(option), date: new Date()}]});
  };

  return (
    <div className={styles.container}>
      {show && (
        <>
          {isPost ?? (
            <select
              value={option}
              onChange={(e) => setOption(e.target.value)}
            >
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="*">*</option>
              <option value="/">/</option>
            </select>
          )}
          <input type="number" value={value} onChange={(e) => setValue(+e.target.value)}/>

          {isPost && <button onClick={postComment}>post</button>}

          {isPost ?? <button onClick={reply}>reply</button>}
        </>
      )}
      {isPost ?? (
        <button onClick={() => setShow(!show)}>
          {show ? 'close' : 'reply'}
        </button>
      )}
    </div>
  );
}

export default ReplyForm;
