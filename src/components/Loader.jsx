import React from 'react';
import clsx from 'clsx';
import styles from './Loader.module.css';

const Loader = (props) => {
  const { small } = props;
  return (
    <div className={clsx({
      [styles.loaderContainer]: true,
    })}
    >
      <div className={styles.loadingio}>
        <div className={styles.ldio}>
          <div className={clsx({
            [styles.smallLoader]: small,
          })}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
