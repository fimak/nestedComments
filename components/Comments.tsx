import React, { FC } from 'react';
import styles from '../styles/Comments.module.css'
import Comment from './Comment';

export interface Comment {
  key: string | number;
  author: string;
  comment: number;
  date: Date;
  comments?: IComments;
}

export interface IComments extends Array<Comment> {}

interface CommentsProps {
  path?: string;
  comments?: IComments;
  userEmail?: string | null;
}

const Comments: FC<CommentsProps> = ({ path, comments, userEmail }) => {
  const newPath = (slug: string | number):string => path ? `${path}/${slug}` : `${slug}`;
  return (
    <div className={styles.container}>
      {comments && comments.map((comment) => (
        <Comment comment={comment} userEmail={userEmail} key={newPath(comment.key)} path={newPath(comment.key)}/>
      ))}
    </div>
  )
}

export default Comments;
