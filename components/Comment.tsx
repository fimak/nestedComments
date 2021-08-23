import React, {FC} from 'react';
import Comments, { Comment as iComment } from './Comments';
import ReplyForm from './ReplyForm';

import styles from '../styles/Comment.module.css';

interface CommentProps {
  comment: iComment;
  userEmail?: string | null;
}

const Comment: FC<CommentProps> = ({ comment, userEmail }) => {

  return (
    <div className={styles.comment}>
      <div className={styles.commentBody}>
        <div>
          <span className={styles.author}>{comment.author} : </span>
          <span>{comment.comment}</span>
        </div>
      </div>
      {userEmail && <ReplyForm />}
      {comment.comments && (
        <Comments comments={comment.comments} userEmail={userEmail} />
      )}
    </div>
  )
}

export default Comment;
