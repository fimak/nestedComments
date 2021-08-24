import React, {FC, useState} from 'react';
import set from 'lodash/set';
import {Comment} from './Comments';
import firebase from './firebase/clientApp';
import styles from '../styles/ReplyForm.module.css';

interface ReplyFormProps {
  author: string;
  path?: string;
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
    if (!path) return false;

    const pathArray = path.split('/');
    let document:any;
    await db.collection('comments').doc(pathArray[0]).get()
      .then((doc) => {
        if (doc.exists) {
          document = doc.data();
        }
      });

    const newPathArray = pathArray.reduce((r, a) => r.concat(a , 'comments'), ['comments']);
    newPathArray.shift();
    newPathArray.shift();

    console.log('document: ', document);

    if (parent) {
      const newValue = (option: string) => {
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
        return 0;
      };

      if (!parent.comments) {
        parent.comments = [];
      }

      parent.comments.push({
        key: parent.comments.length,
        author,
        comment: newValue(option),
        date: new Date()
      });

      if (newPathArray.length > 1) {
        if (newPathArray.length > 1) { newPathArray.pop(); }
        const newDocument = set(document, newPathArray, parent);
        await db.collection('comments').doc(pathArray[0]).update({ ...newDocument });
      } else {
        await db.collection('comments').doc(pathArray[0]).update({ comments: parent.comments });
      }
    }
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
