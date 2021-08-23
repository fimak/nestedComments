import firebase from 'firebase';
import React, { FC } from 'react';
import styles from '../styles/Comments.module.css'
import Comment from './Comment';

export interface Comment {
  author: string;
  comment: number;
  date: Date;
  comments?: IComments;
}

export interface IComments extends Array<Comment> {}

interface CommentsProps {
  comments?: IComments
  userEmail?: string | null;
}

const Comments: FC<CommentsProps> = ({ comments, userEmail }) => {
  return (
    <div className={styles.container}>
      {comments && comments.map((comment) => (
        <Comment comment={comment} userEmail={userEmail} key={comment.comment + comment.date.seconds} />
      ))}
    </div>
  )
}

export default Comments;
