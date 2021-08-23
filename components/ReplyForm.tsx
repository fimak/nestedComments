import React, { FC, useState } from 'react';
import styles from '../styles/ReplyForm.module.css';

interface ReplyFormProps {

}

const ReplyForm: FC<ReplyFormProps> = ({ }) => {
  const [show, setShow] = useState(false);
  const [option, setOption] = useState('+');
  const [value, setValue] = useState(0);

  return (
    <div className={styles.container}>
      {show && (
        <>
          <select
            value={option}
            onChange={(e) => setOption(e.target.value)}
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
          </select>
          <input type="number" value={value} onChange={(e) => setValue(+e.target.value)} />
          <button onClick={() => console.log('[eq')}>reply</button>
        </>
    )}
      <button onClick={() => setShow(!show)}>
        {show ? 'close' : 'reply'}
      </button>
    </div>
  );
}

export default ReplyForm;
