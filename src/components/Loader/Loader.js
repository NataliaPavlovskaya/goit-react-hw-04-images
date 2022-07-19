import React from 'react'
import { TailSpin } from 'react-loader-spinner';

import styles from './Loader.module.css';

const Loader = () => (
    <div className={styles.Loader}>
      <TailSpin type="TailSpin" color="#02be6e" height={80} width={80} />
    </div>
  );
export default Loader;