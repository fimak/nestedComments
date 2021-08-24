import React, { FC, useState } from 'react';
import firebase from '../components/firebase/clientApp';
import { Comment } from './Comments';
import styles from '../styles/ReplyForm.module.css';

interface ReplyFormProps {
  author: string;
  isPost?: boolean;
}

const ReplyForm: FC<ReplyFormProps> = ({ author, isPost }) => {
  const [show, setShow] = useState(isPost || false);
  const [option, setOption] = useState('+');
  const [value, setValue] = useState(0);
  const db = firebase.firestore();

  const postComment = async (comment: Comment) => {
    await db.collection('comments').add(comment);
  }

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
          <input type="number" value={value} onChange={(e) => setValue(+e.target.value)} />
          <button
            onClick={() => postComment({
              author,
              comment: value,
              date: new Date(),
            })}
          >
            {isPost ? 'post' : 'reply'}
          </button>
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
