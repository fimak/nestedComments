import React, {FC} from 'react';
import Comments, { Comment as iComment } from './Comments';
import ReplyForm from './ReplyForm';

import styles from '../styles/Comment.module.css';

interface CommentProps {
  path: string;
  comment: iComment;
  userEmail?: string | null;
}

const Comment: FC<CommentProps> = ({ path, comment, userEmail }) => {
  const newPath = (slug: string | number):string => path ? `${path}/${slug}` : `${slug}`;
  return (
    <div className={styles.comment}>
      <div className={styles.commentBody}>
        <div>
          <span className={styles.author}>{comment.author} : </span>
          <span>{comment.comment}</span>
        </div>
      </div>
      {userEmail && <ReplyForm author={userEmail} path={path} parent={comment}/>}
      {comment.comments && (
        <Comments comments={comment.comments} userEmail={userEmail} path={path} />
      )}
    </div>
  )
}

export default Comment;
